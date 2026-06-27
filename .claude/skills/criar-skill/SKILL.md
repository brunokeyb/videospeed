---
name: criar-skill
description: Cria uma nova skill do Claude Code seguindo o padrão canônico. Coleta inputs, drafta o SKILL.md, deploya em N repos (criando branch se necessário), registra na base Skills do Notion (com SKILL.md completo no corpo da page como bootstrap canônico), gera o comando PS pra instalar local. Aplica o checklist §4.2 da /executar pra qualquer [PS] que emitir. Ativar dizendo "criar skill", "nova skill" ou /criar-skill.
---

# Skill: criar-skill

Ative SEMPRE que o usuário disser:
- "criar skill"
- "nova skill"
- "/criar-skill"

## Pré-requisitos

- Base `Skills` no Notion existir: data_source `b6b5920c-44cb-4e23-9eb6-74a1c76bb485`.
- Base `Repositórios` no Notion existir: data_source `cb3f6305-d441-465a-9158-a3e93fc01c62`.
- A skill `/executar` está ativa — este fluxo segue a metodologia dela (Notion-pivô parcial, Princípio 5 Bruno-último-recurso, checklist §4.2 pra [PS], §4.1.1 pra [CODE] deploy, identidade de conta).

## Workflow

### 1. Coleta de inputs

Pergunte ao Bruno (em 1 bloco só, pra ele responder de uma vez):

```text
Pra criar a skill, preciso de:
1. Nome (slug minúsculo, sem espaços, ex: "revisar-ecossistema")
2. Frase-gatilho (ex: "/revisar-ecossistema" e/ou "vamos revisar o ecossistema")
3. Pra que serve (1-2 linhas)
4. Quando usar (1-2 linhas)
5. Deploy em quais repos? (default: TODOS os Ativos da base Repositórios)
6. Origem: Própria / Comunidade / Importada (default: Própria)
```

### 2. Validação pré-deploy ([CODE])

- **Conflito de nome:** consulte base Skills (`b6b5920c-44cb-4e23-9eb6-74a1c76bb485`) por skill com mesmo Nome.
- **Branch nos repos alvo:** pra cada repo do `Deploy em`, conferir branch. Se NÃO, `create_branch` usando o default do repo como source.
- **Visibilidade dos repos:** define se [PS] de install local usa `Invoke-WebRequest` (público) ou heredoc (privado).

### 3. Draft do SKILL.md ([CODE] + revisão [BRUNO])

Use o template canônico (estrutura da /executar v1.3+) com: frontmatter, Skill heading, Princípios, Fluxo (Abertura/Layout/Classificação/Loop/Encerramento com pergunta-meta), O que NÃO fazer, Referências, Versão.

Apresente o draft em code block. PARE e aguarde aprovação. Itere até OK.

### 4. Deploy nos repos ([CODE])

Pra cada repo em `Deploy em`:
1. Confirme branch existe (criar via `create_branch` se necessário; usar default branch como source).
2. `create_or_update_file` no caminho `.claude/skills/<slug>/SKILL.md`.
3. Reporte commit URL.

### 5. Registro na base Skills ([CODE]) — **AMPLIADO em v1.1**

**5.a. Page com metadados:** crie page na base Skills (`b6b5920c-44cb-4e23-9eb6-74a1c76bb485`) com:
- `Nome` = slug
- `Frase-gatilho`, `Pra que serve`, `Quando usar`
- `Versão atual` = "1.0"
- `Status` = "Ativa"
- `Origem` = input do passo 1
- `Deploy em` = relação aos URLs das pages dos repos (base Repositórios)
- `Changelog` = "1.0 (YYYY-MM-DD) — design inicial."
- Ícone (emoji) opcional.

**5.b. Conteúdo canônico no corpo da page (NOVO em v1.1):** após criar a page, **anexe o SKILL.md COMPLETO no corpo** como code block markdown. Por quê: **Notion vira a fonte canônica de bootstrap** — qualquer sessão ou repo onde a skill ainda não está instalada pode pegar dali via copy/paste, sem depender de MCP.

Formato a inserir no corpo (via `insert_content` no fim da page):

````markdown
---

## 📄 Conteúdo do SKILL.md — versão canônica (vX.Y)

> Como usar:
> - Clica no botão "copy" no canto superior direito do bloco abaixo.
> - Pra instalar em repo novo: vai na UI do GitHub, cria `.claude/skills/<slug>/SKILL.md`, cola, commita.
> - Pra instalar local (Windows PowerShell): heredoc `$skill = @'...'@` + `Set-Content -Encoding UTF8`.
> - Em sessão Claude Code: "instala esta skill aqui" e cola.
>
> ⚠️ Esta é a fonte canônica. Toda atualização da skill deve atualizar este bloco também (Notion = verdade).

```markdown
<conteúdo COMPLETO do SKILL.md aqui>
```

_Última sincronização Notion ↔ GitHub: YYYY-MM-DD (vX.Y)._
````

**5.c. Sincronização em updates:** quando bumpar versão (vX.Y → vX.Y+1), tanto o `Versão atual` quanto o code block no corpo da page DEVEM ser atualizados. Pull única; Notion não pode ficar atrás.

### 6. Install local ([PS])

**Aplicar checklist §4.2 da /executar antes de emitir:**
- Repos privados → heredoc paste.
- Heredoc safe = ASCII puro pra PS 5.1.
- Caminho absoluto `$HOME\.claude\skills\<slug>\`.
- Idempotente: `Set-Content` + `New-Item -ItemType Directory -Force`.
- `-Encoding UTF8`.

### 7. Encerramento (pergunta-meta)

Aplique §5 da /executar: atualize Aplicação, resumo, pergunta-meta. Lições novas → bump versão da /criar-skill.

## O que NÃO fazer

- Não pule a coleta de inputs nem o draft com aprovação do Bruno.
- Não emita [PS] sem rodar o checklist §4.2 da /executar.
- Não registre na base Skills antes de confirmar o deploy nos repos.
- **NUNCA registre a page Skills só com metadados — sempre anexe o SKILL.md no corpo (§5.b).** Caso contrário, o Notion fica incompleto como bootstrap.
- Não use `Invoke-WebRequest` pra repo privado.
- Não invente campos novos na base Skills sem perguntar ao Bruno.

## Referências

- /executar SKILL (catálogo Skills): `38c5523c-cba6-81bc-835a-e278e1d6bda3`
- Skills base: `b6b5920c-44cb-4e23-9eb6-74a1c76bb485`
- Repositórios base: `cb3f6305-d441-465a-9158-a3e93fc01c62`
- Guarda-chuva: https://app.notion.com/p/ef7e073499ff4d8e842f3ae024c7b150

## Versão

- 1.0 (2026-06-27) — design inicial. Workflow de 7 passos: coleta → validação → draft → deploy → registro Notion → install local → encerramento. Herda §4.2 da /executar pra [PS].
- 1.1 (2026-06-27) — **§5 ampliado:** passo `5.b` (anexar SKILL.md completo no corpo da page Skills como code block markdown) + passo `5.c` (sincronizar Notion em todo bump de versão). Razão: Notion vira fonte canônica de bootstrap pra sessões/repos onde a skill não está instalada. Atende sua proposta: "qualquer sessão pode pegar do Notion e subir".

> **Nota:** changelog migra pra campo `Changelog` da page Skills. Toda atualização sincroniza Notion (campo Versão atual + Changelog + code block no corpo) E os repos do Deploy em.
