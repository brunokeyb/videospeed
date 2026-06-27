---
name: executar
description: Orquestra execução entre 4 atores (Claude Code + PowerShell local + Claude no Chrome + Bruno) usando uma página de Aplicação no Notion como central de comando. Bruno é último recurso absoluto. Toda ação em serviço autenticado declara conta/e-mail/projeto. Comandos [PS] validam pressupostos do ambiente antes de serem emitidos. [CODE] deploys em repos validam escopo da sessão e existência de branch antes de pushar. Captura melhorias durante a execução, faz triagem no fim e mantém fila no Protocolo original. Sempre fecha com pergunta-meta. Ativar dizendo "vamos executar este passo a passo", "executar passo a passo" ou /executar.
---

# Skill: executar

Ative SEMPRE que o usuário disser:
- "vamos executar este passo a passo"
- "executar passo a passo"
- "/executar"

## Princípios

**1. Notion-pivô parcial.** A página da **Aplicação** é a central de comando de Bruno e Claude Code. Bruno marca progresso lá; eu releio pra saber o que avançou. **O Claude no Chrome NÃO lê Notion** — ele recebe prompt cirúrgico no chat, executa, devolve resposta; Bruno cola de volta no chat.

**2. Code blocks pra tudo copiável.** URL, comando, prompt pro Chrome, frase exata pra dizer — sempre em bloco de código.

**3. Captura → Triagem → Fila.** Melhorias percebidas durante a execução vão pra seção "Melhorias propostas" da Aplicação. No encerramento, triagem em lote. Itens "fila" ficam na seção "Fila de melhorias" do Protocolo original.

**4. Pergunta-meta sempre.** O encerramento NUNCA termina sem perguntar se há mais melhorias — no Protocolo e na própria Skill.

**5. Bruno é último recurso absoluto.** A ordem de preferência é SEMPRE: `[CODE] → [PS] → [CHROME] → [BRUNO]`. **NUNCA ofereça [BRUNO] como atalho de conveniência** — erro grave.

**6. Identidade de conta, SEMPRE.** Toda ação em serviço autenticado declara conta/e-mail/projeto. Fonte: base **Acessos / Caminhos** (`3765523c-cba6-81b8-9f5e-ddcde278e62e`). **NUNCA cole senha no chat.** [CHROME]/[PS]/[BRUNO] CONFERIR conta/projeto ANTES de agir.

**7. Validar pressupostos antes de emitir `[PS]`.** Ver checklist em §4.2.

**8. Validar pressupostos antes de emitir `[CODE]` deploy.** Ver checklist em §4.1.1.

## Fluxo

### 1. Abertura (obrigatória)

1. Confirme o objetivo em 1 frase.
2. Busque no Notion se existe Protocolo (`397e3d7a-fe6b-4921-a4c2-a365f996d569`).
3. Identifique contas/projetos envolvidos — consulte Acessos / Caminhos.
4. Crie a Aplicação (`0ff5a844-fe1c-4cb4-84d0-d9d0f4218f69`).
5. Devolva o link em code block.

### 2. Layout do corpo da Aplicação

Use **checkbox markdown nativo** no cabeçalho de cada passo:

```
- [ ] **Passo N · [TAG] — Título curto**
  - **Conta/Projeto:** <e-mail · projeto · serviço>  (só se autenticado)
  - **O que fazer:** ...
  - **O que devolver:** <dado/frase exata>
```

Estados não-binários inline: `⏸️ pausado`, `❌ descartado`, `▶️ em andamento`.

Seções fixas no fim: `💡 Melhorias propostas pro Protocolo` e `Pormenores deste caso (opcional)`.

### 3. Classificação de cada passo

| Tag | Quem faz | Quando usar |
|---|---|---|
| **[CODE]** | Claude Code (eu) | MCP, arquivos cloud, Bash, web search. **Validar pré-deploy — §4.1.1.** |
| **[PS]** | PowerShell local do Bruno | Comando único. **Validar pré-emissão — §4.2.** |
| **[CHROME]** | Claude no Chrome (Bruno cola) | Navegação web autenticada. |
| **[BRUNO]** | Bruno manual | Logins, 2FA, segredos, OAuth, biometria, irreversíveis. |

Ordem: `[CODE] → [PS] → [CHROME] → [BRUNO]`. [BRUNO] nunca como atalho.

### 4. Loop de execução

Um passo por vez. Espere retorno.

**4.1. [CODE]:** execute direto. Marque checkbox na página, reporte 1-2 linhas.

**4.1.1. [CODE] — checklist pré-deploy em repos (NOVO em v1.4):**

Antes de pushar arquivo em repo (especialmente repo/branch/path novo):

- **Escopo da sessão:** o repo está na lista de repos autorizados desta sessão? Sessão é fixa na criação — repo no Web account (sidebar) ≠ acessível pela MCP. Se MCP retornar `"repository not configured for this session"`, **PARE** e oriente o Bruno: (a) adicionar via Web UI da sessão, (b) abrir sessão nova que inclua o repo, ou (c) deferir o deploy.
- **Branch existe?** Pra cada repo do deploy, conferir se a branch alvo existe. Se não, `create_branch` usando o default branch do repo como source. **Padrão:** tentar `create_or_update_file` → se falhar com `"Branch X not found"`, fazer `create_branch` e retentar. Ou proativamente: `list_branches` antes pra evitar a chamada falhada.
- **Arquivo já existe?** Update precisa do SHA (`create_or_update_file` exige). Create novo, omitir SHA. Se houver dúvida, `get_file_contents` antes pra checar.
- **Consistência multi-repo:** se a mesma skill/arquivo vai pra N repos, use o **mesmo conteúdo** pros N. Mandar versões diferentes na mesma batch = drift garantido (lição real desta sessão).

**4.2. [PS] — checklist de validação ANTES de emitir:**

Toda vez que for emitir um `[PS]`, percorra mentalmente. Se algum item falhar, **NÃO emita**.

- **Fetch de URL?** O recurso é **público**? `raw.githubusercontent.com` SÓ funciona pra repos **públicos**. Privados retornam **404**. Repo privado → use **heredoc paste** (`@'...'@`) com conteúdo embedded. NÃO `Invoke-WebRequest`.
- **Ferramenta instalada?** (`gh`, `git`, `python`, `node`…) — confirme ou use só built-ins do PowerShell.
- **Branch com `/` no nome?** Pra raw URLs use `refs/heads/<branch>`.
- **Idempotente?** `Set-Content`, `New-Item -Force`, `Test-Path`.
- **Irreversível?** Peça confirmação explícita antes (`Remove-Item -Recurse` etc).
- **Caminhos absolutos** (`$HOME\...`).
- **Codificação?** `-Encoding UTF8`. Heredoc safe pra PS 5.1 = ASCII puro (sem emojis/curly quotes).

Depois de validar, emita o handoff em code block `powershell`.

**4.3. [CHROME]:** prompt direto no chat. SEMPRE começa confirmando conta/projeto + "se for outra, PARE e avise".

**4.4. [BRUNO]:** instruções já na página. No chat só pingue.

**4.5. Quando Bruno disser `próximo`:** releia a Aplicação, atualize, pegue o próximo. Não enfileire.

### 5. Encerramento (obrigatório)

**5.1.** Atualize a Aplicação (`Status: Concluída`, `Resultado` com artefatos — NUNCA segredos).

**5.2.** Resumo no chat: N passos · X [CODE] · Y [PS] · Z [CHROME] · W [BRUNO] · link.

**5.3.** Triagem em lote: A aplicar / F fila / D descartar.

**5.4.** Se não usou Protocolo, pergunte se salva como novo.

**5.5.** Pergunta-meta SEMPRE: melhorias no Protocolo? na Skill? Se na Skill, diff → aplique → re-deploye nos repos → Changelog da page Skills.

**5.6.** Cruzamentos: mencione protocolos relacionados/obsoletos.

## Comandos paralelos

**"revisa fila do Protocolo X"** → leia `📥 Fila de melhorias`, apresente, pergunte quais aplicar.

## O que NÃO fazer

- Não execute [BRUNO] por conta. Nunca ofereça [BRUNO] como atalho.
- **Nunca emita [PS] sem rodar checklist §4.2.**
- **Nunca emita [CODE] deploy sem rodar checklist §4.1.1** (escopo da sessão + branch existe).
- **Nunca tente push num repo fora do escopo da sessão** — vai falhar com `"repository not configured"`. Confirme antes.
- **Nunca pule `create_branch` quando a branch alvo pode não existir** — comum em repos novos.
- **Nunca mande conteúdos diferentes pra mesma skill na mesma batch** — drift garantido.
- **Nunca emita [PS] com `Invoke-WebRequest` pra `raw.githubusercontent.com` de repo PRIVADO** — 404. Privado → heredoc.
- Nunca aja em serviço autenticado sem declarar conta/projeto.
- Nunca cole senha no chat.
- Não pule busca no Notion na abertura nem pergunta-meta no fim.
- Copiáveis sempre em code block.
- Não peça pro Chrome ler Notion.

## Referências

- Guarda-chuva: https://app.notion.com/p/ef7e073499ff4d8e842f3ae024c7b150
- Protocolos: data_source `397e3d7a-fe6b-4921-a4c2-a365f996d569`
- Aplicações: data_source `0ff5a844-fe1c-4cb4-84d0-d9d0f4218f69`
- **Skills**: data_source `b6b5920c-44cb-4e23-9eb6-74a1c76bb485`
- **Repositórios**: data_source `cb3f6305-d441-465a-9158-a3e93fc01c62`
- **Acessos / Caminhos**: `3765523c-cba6-81b8-9f5e-ddcde278e62e` (nunca expor segredos)
- Vocabulário BND: "matriz geradora", "sessão de aplicação".

## Versão

- 1.0 (2026-06-27) — design inicial.
- 1.1 (2026-06-27) — Bruno último recurso absoluto + identidade de conta.
- 1.2 (2026-06-27) — [PS] como 4º ator + checkbox markdown nativo.
- 1.3 (2026-06-27) — Princípio 7 + checklist §4.2 obrigatório antes de emitir [PS] (repo público vs privado, refs/heads, idempotência, caminhos absolutos, confirmação pra irreversíveis).
- 1.4 (2026-06-27) — **Princípio 8 + checklist §4.1.1 pré-deploy [CODE]:** validar escopo da sessão (repo no Web account ≠ acessível pela MCP) + branch existe (`create_branch` quando faltar) + consistência multi-repo (mesmo conteúdo na batch). Origem: 3 erros reais nesta sessão — videospeed/eternizze sem branch ao primeiro push, plataforma-cultural-al fora do escopo, drift de conteúdo entre 3 repos do /criar-skill. Nota operacional: Notion `update_content` em batch grande pode falhar por reformatação dos blocos — preferir patterns linha-única ou `replace_content` pra mudanças grandes.

> **Nota:** changelog migra pra page da skill na base Skills.
