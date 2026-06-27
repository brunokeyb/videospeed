---
name: executar
description: Orquestra execução entre 4 atores (Claude Code + PowerShell local + Claude no Chrome + Bruno) usando uma página de Aplicação no Notion como central de comando. Bruno é último recurso absoluto. Toda ação em serviço autenticado declara conta/e-mail/projeto. Comandos [PS] validam pressupostos do ambiente antes de serem emitidos. Captura melhorias durante a execução, faz triagem no fim e mantém fila no Protocolo original. Sempre fecha com pergunta-meta. Ativar dizendo "vamos executar este passo a passo", "executar passo a passo" ou /executar.
---

# Skill: executar

Ative SEMPRE que o usuário disser:
- "vamos executar este passo a passo"
- "executar passo a passo"
- "/executar"

## Princípios

**1. Notion-pivô parcial.** A página da **Aplicação** é a central de comando de Bruno e Claude Code. Bruno marca progresso lá; eu releio pra saber o que avançou. **O Claude no Chrome NÃO lê Notion** — ele recebe prompt cirúrgico no chat, executa, devolve resposta; Bruno cola de volta no chat.

**2. Code blocks pra tudo copiável.** URL, comando, prompt pro Chrome, frase exata pra dizer — sempre em bloco de código. Nunca em parágrafo corrido.

**3. Captura → Triagem → Fila.** Melhorias percebidas durante a execução vão pra seção "Melhorias propostas" da Aplicação. No encerramento, triagem em lote. Itens "fila" ficam na seção "Fila de melhorias" do Protocolo original.

**4. Pergunta-meta sempre.** O encerramento NUNCA termina sem perguntar se há mais melhorias — no Protocolo e na própria Skill.

**5. Bruno é último recurso absoluto.** A ordem de preferência é SEMPRE: `[CODE] → [PS] → [CHROME] → [BRUNO]`. Quando mais de um ator pode fazer a tarefa, prefere o anterior na lista. `[BRUNO]` só quando os três anteriores forem **comprovadamente impossíveis** (login, 2FA/OTP, segredo, OAuth, biometria, ação irreversível). **NUNCA ofereça `[BRUNO]` como atalho de conveniência** — erro grave.

**6. Identidade de conta, SEMPRE.** Toda ação que toca serviço autenticado (Supabase, GitHub, Google, Notion) DEVE declarar explicitamente qual conta/e-mail e qual projeto/workspace. Fonte da verdade: base "Acessos / Caminhos" no Notion (`3765523c-cba6-81b8-9f5e-ddcde278e62e`), organizada por Serviço × Sistema. Regras:
- **NUNCA** cole senha/credencial no chat — aponte pra base.
- Pra `[CHROME]`, `[PS]` e `[BRUNO]`, o handoff deve mandar CONFERIR a conta/projeto ativos ANTES de qualquer ação (ex.: antes de rodar SQL no Supabase, confirmar que está no projeto certo).
- Se eu não souber qual conta/projeto, busco na base Acessos / Caminhos antes de emitir o handoff; se ainda assim não achar, pergunto ao Bruno.

**7. Validar pressupostos antes de emitir `[PS]`.** Comandos PowerShell SÓ devem sair depois de eu verificar que os pressupostos do ambiente do Bruno são reais. Ver checklist em §4.2.

## Fluxo

### 1. Abertura (obrigatória)

1. Confirme o objetivo em 1 frase.
2. Busque no Notion se existe Protocolo (data_source `397e3d7a-fe6b-4921-a4c2-a365f996d569`). Busque em "Serve para" e "Tags". Achou? Pergunte qual aplicar.
3. Identifique contas/projetos envolvidos — se toca serviço autenticado, consulte Acessos / Caminhos.
4. Crie a Aplicação (data_source `0ff5a844-fe1c-4cb4-84d0-d9d0f4218f69`): Nome, Matriz geradora, Status Em andamento, Data de aplicação hoje, Caso/Contexto, corpo no layout de §2.
5. Devolva o link ao Bruno em code block, com 1 frase.

### 2. Layout do corpo da Aplicação

Use **checkbox markdown nativo** no cabeçalho de cada passo (clicável no Notion):

```
- [ ] **Passo N · [TAG] — Título curto**
  - **Conta/Projeto:** <e-mail · projeto · serviço>  (só se autenticado)
  - **O que fazer:** ação 1, ação 2…
  - **O que devolver:** <dado/frase exata>
```

**Marcar concluído:** um clique no checkbox.
**Estados não-binários** (raro): mantenha desmarcado e acrescente marcador inline:

```
- [ ] **Passo N** ⏸️ pausado: <motivo>
- [ ] **Passo N** ❌ descartado: <motivo>
- [ ] **Passo N** ▶️ em andamento
```

Depois dos passos, duas seções fixas:

```
---
## 💡 Melhorias propostas pro Protocolo
(Bruno escreve aqui livre, entre passos. Triagem no encerramento.)
-

---
## Pormenores deste caso (opcional)
(Notas específicas que NÃO devem voltar pro Protocolo original.)
-
```

(Símbolos BND `( - )` `(>)` `(ok)` `(!)` `(X)` continuam disponíveis pra anotações inline, mas o **cabeçalho do passo** usa o checkbox.)

### 3. Classificação de cada passo

| Tag | Quem faz | Quando usar |
|---|---|---|
| **[CODE]** | Claude Code (eu) | MCP (Notion/GitHub/Drive/Gmail/Calendar), arquivos cloud, Bash, web search/fetch. |
| **[PS]** | PowerShell no terminal local do Bruno | Comando único, paste-and-run. Operações de sistema local: criar pasta, mover/escrever arquivo, instalar pacote, atualizar SKILL.md local, snapshots. **Validar pressupostos antes — ver §4.2.** |
| **[CHROME]** | Claude no Chrome (Bruno cola do chat) | Navegação em tela web já autenticada — descrever, guiar cliques, ler conteúdo. |
| **[BRUNO]** | Bruno manual | Logins, 2FA/OTP, copiar/baixar segredos, OAuth, downloads sensíveis, biometria, ações irreversíveis. |

**Ordem de preferência (escale só quando o anterior travar):**
1. **[CODE]** — primeiro, sempre.
2. **[PS]** — se for tarefa local-system (arquivos, instalação, sistema do PC) e couber num comando.
3. **[CHROME]** — se for tela web autenticada (UI).
4. **[BRUNO]** — só se os três acima forem impossíveis. **Nunca ofertado como atalho.**

### 4. Loop de execução

Um passo por vez. Espere retorno.

**4.1. [CODE]:** execute direto. Marque o checkbox na página, preencha o que produziu. 1-2 linhas no chat.

**4.2. [PS] — checklist de validação ANTES de emitir o handoff:**

Toda vez que você for emitir um `[PS]`, percorra mentalmente este checklist. Se algum item falhar, **NÃO emita** — escolha outro caminho ou pergunte ao Bruno.

- **Fetch de URL?** O recurso é **público**?
  - `raw.githubusercontent.com` SÓ funciona pra repos **públicos**. Repos privados retornam **404**.
  - Repo privado → use **heredoc paste** (`@'...'@`) com o conteúdo embedded no próprio comando. NÃO use `Invoke-WebRequest`.
  - Outros endpoints (API, webhook, CDN privado) → idem: se exige auth, ou o token está em variável de ambiente conhecida no PC do Bruno, ou use heredoc.
- **Depende de ferramenta instalada?** (`gh`, `git`, `python`, `node`, `7z`…) — confirme com Bruno se ele tem, ou use só built-ins do PowerShell.
- **Branch com `/` no nome?** Pra raw URLs, use `refs/heads/<branch>` pra desambiguar. (Não evita o 404 de repo privado.)
- **Idempotente?** Rodar 2x não pode corromper. Use `New-Item -Force`, `Set-Content` (não `Add-Content` cego), checagens `if (Test-Path ...)`.
- **Irreversível?** (apagar, sobrescrever sem backup, `Remove-Item -Recurse`) — peça **confirmação explícita** no chat antes de mandar.
- **Pressupõe diretório de trabalho?** Use **caminhos absolutos** (`$HOME\...`, `$env:USERPROFILE\...`), nunca relativos.
- **Codificação?** Pra arquivos com acentos/emojis, use `-Encoding UTF8` no `Set-Content`. Pra paste safe em heredoc do PS 5.1, evite emojis e curly quotes — use ASCII puro.

Depois de validar, emita o handoff em code block `powershell`:

````text
💻 [PS] passo N — cola este comando no PowerShell:

```powershell
<comando completo, autocontido, idempotente, validado pelo checklist acima>
```

✅ Quando rodar, marca o checkbox do Passo N na página e me diz `próximo`.
Se der erro, cola a mensagem aqui.
````

**4.3. [CHROME]:** prompt direto no chat. SEMPRE começa confirmando conta/projeto:

````text
🌐 [CHROME] passo N — cola este bloco no Claude do Chrome:

```text
Conta esperada: <e-mail> · Projeto/workspace: <nome> · Serviço: <X>
ANTES DE TUDO: confirme que o navegador está NESSA conta e NESSE projeto.
Se estiver em outra conta/projeto, PARE e me avise — não execute nada.

<instrução clara da tarefa>

Ao terminar, devolva pro Bruno copiar pra mim:
"<resultado/dado exato>"  — ou  "travei em <X>, precisa do Bruno".
```

📋 Bruno: cola lá, espera, e cola aqui a resposta.
````

**4.4. [BRUNO]:** instruções já na página. No chat só pingue (com conta/projeto se houver login):

````text
👤 Próximo é [BRUNO] passo N. Descrito na página.
(Se envolver conta: <e-mail> · projeto <nome> · serviço <X>.)
Quando terminar, marca o checkbox lá e me diz `próximo`.
````

**4.5. Quando Bruno disser `próximo` (ou colar resposta do Chrome/erro do PS):**
1. Releia a Aplicação pra ver estado real.
2. Atualize o passo na página com o resultado.
3. Pegue o próximo pendente.
4. Execute [CODE] ou emita handoff.

**Não enfileire. Não invente que "acionei o Chrome" ou "rodei o PS".**

### 5. Encerramento (obrigatório, nessa ordem)

**5.1.** Atualize a Aplicação: `Status: Concluída`, `Resultado` com 1-2 linhas e artefatos (URLs, paths, IDs) — NUNCA segredos.

**5.2.** Resumo no chat:

````text
✅ Aplicação concluída · <título>
- N passos · X [CODE] · Y [PS] · Z [CHROME] · W [BRUNO]
- Artefatos: <lista curta ou "nenhum">
- Página: <URL da Aplicação>
````

**5.3.** Triagem de melhorias (se houver na seção `💡 Melhorias propostas`):

````text
Triagem de N melhorias propostas. Pra cada:
(A) aplicar agora no Protocolo
(F) mandar pra fila do Protocolo
(D) descartar

1. <item 1>
2. <item 2>

Responde no formato: "1A 2F 3D"
````

Aplique: (A) → edite o Protocolo. (F) → acrescente em `📥 Fila de melhorias`. (D) → ignore.

**5.4.** Se não usou Protocolo, pergunte se salva como novo (Nome / Tipo / Tags / Origem=Claude).

**5.5.** Pergunta-meta SEMPRE:

````text
Fechando — pensando agora a frio:
1. Mais alguma melhoria no Protocolo?
2. Alguma melhoria na própria Skill `executar`?

Responde: "nada" / "protocolo: ..." / "skill: ..." / ambas.
````

Se melhoria na Skill → mostre o diff exato, aplique se aprovado (edite o SKILL.md, adicione linha em `## Versão`), **re-deploye nos repos** onde a skill vive, e — quando a base Skills do Notion existir — **adicione linha no `Changelog` lá também**.

**5.6.** Cruzamentos: mencione protocolos relacionados/obsoletos detectados.

## Comandos paralelos

**"revisa fila do Protocolo X"** → leia `📥 Fila de melhorias`, apresente cada item, pergunte *"Quais aplicar?"*, aplique no checklist principal.

## O que NÃO fazer

- Não execute [BRUNO] por conta.
- **Nunca ofereça [BRUNO] como atalho/conveniência** quando [PS] ou [CHROME] poderiam resolver.
- **Nunca emita [PS] com `Invoke-WebRequest` pra `raw.githubusercontent.com` de repo privado** — vai dar 404. Repo privado → heredoc paste com conteúdo embedded.
- **Nunca emita [PS] sem rodar o checklist de validação de §4.2.**
- **Nunca** aja em serviço autenticado sem declarar conta/e-mail/projeto.
- **Nunca** cole senha no chat — aponte pra Acessos / Caminhos.
- Não pule a busca no Notion na abertura nem a pergunta-meta no fim.
- Copiáveis sempre em code block (com linguagem: `powershell`, `text`, `url`…).
- Não peça pro Chrome ler Notion.

## Referências (base do Bruno)

- Guarda-chuva: https://app.notion.com/p/ef7e073499ff4d8e842f3ae024c7b150
- Protocolos: data_source `397e3d7a-fe6b-4921-a4c2-a365f996d569`
- Aplicações: data_source `0ff5a844-fe1c-4cb4-84d0-d9d0f4218f69`
- **Acessos / Caminhos** (contas/e-mails/projetos por Serviço × Sistema): `3765523c-cba6-81b8-9f5e-ddcde278e62e`. NUNCA expor segredos.
- Vocabulário BND: "matriz geradora", "sessão de aplicação".

## Versão

- 1.0 (2026-06-27) — design inicial. Notion-pivô parcial, Chrome via paste direto, captura→triagem→fila, pergunta-meta.
- 1.1 (2026-06-27) — Bruno como último recurso absoluto + regra de identidade de conta (e-mail/projeto declarados; conferir antes de agir; nunca colar segredos no chat; ref. base Acessos / Caminhos).
- 1.2 (2026-06-27) — Adiciona **[PS]** como 4º ator (PowerShell local). Nova ordem: `[CODE] → [PS] → [CHROME] → [BRUNO]`. Layout passa a usar **checkbox markdown nativo** (`- [ ]`) no cabeçalho de cada passo.
- 1.3 (2026-06-27) — **Guard-rails de [PS]:** Princípio 7 + checklist obrigatório em §4.2 antes de emitir comando. Regras específicas: repo público vs privado (raw.githubusercontent só funciona pra públicos; privado → heredoc paste); branches com `/` precisam `refs/heads/`; idempotência; caminhos absolutos; pedido de confirmação pra irreversíveis. Origem: bug real do `Invoke-WebRequest` que falhou em repo privado.

> **Nota:** este changelog migra pra base `Skills` no Notion quando esta for criada — vira o `Changelog` da página da skill. Até lá, vive aqui.
