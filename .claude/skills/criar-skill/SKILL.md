---
name: criar-skill
description: Cria uma nova skill do Claude Code seguindo o padrão canônico. Coleta inputs, drafta o SKILL.md, deploya em N repos (criando branch se necessário), registra na base Skills do Notion, gera o comando PS pra instalar local. Aplica o checklist §4.2 da /executar pra qualquer [PS] que emitir. Ativar dizendo "criar skill", "nova skill" ou /criar-skill.
---

# Skill: criar-skill

Ative SEMPRE que o usuário disser:
- "criar skill"
- "nova skill"
- "/criar-skill"

## Pré-requisitos

- Base `Skills` no Notion existir: data_source `b6b5920c-44cb-4e23-9eb6-74a1c76bb485`.
- Base `Repositórios` no Notion existir: data_source `cb3f6305-d441-465a-9158-a3e93fc01c62`.
- A skill `/executar` está ativa — este fluxo segue a metodologia dela (Notion-pivô parcial, Princípio 5 Bruno-último-recurso, checklist §4.2 pra [PS], identidade de conta).

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

- **Conflito de nome:** consulte base Skills (`b6b5920c-44cb-4e23-9eb6-74a1c76bb485`) por skill com mesmo Nome. Se existir, pergunte se é update (vai pra fluxo de versão) ou rename.
- **Branch nos repos alvo:** pra cada repo do `Deploy em`, conferir se a branch `claude/serene-shannon-v3h22j` (ou outra branch padrão definida no card do Repositório) existe. Se NÃO, `create_branch` usando o default do repo como source.
- **Visibilidade dos repos:** anote pra usar no comando PS de instalação local (define se podemos usar `Invoke-WebRequest` ou se vai ter que ser heredoc — §4.2 da /executar).

### 3. Draft do SKILL.md ([CODE] + revisão [BRUNO])

Use o template canônico (estrutura da /executar v1.3):

```
---
name: <slug>
description: <1 parágrafo cobrindo o quê + quando + frases-gatilho>
---

# Skill: <slug>

Ative SEMPRE que o usuário disser: <frases-gatilho>.

## Princípios
(adapte do /executar; pode herdar Princípios 5 e 6 se a skill orquestra atores ou toca contas)

## Fluxo
### 1. Abertura
### 2. Layout (se aplicável)
### 3. Classificação dos passos (se for orquestradora)
### 4. Loop
### 5. Encerramento (com pergunta-meta)

## O que NÃO fazer
(no mínimo: itens de §4.2 + identidade de conta + Bruno último recurso, se aplicável)

## Referências
- Skills base: b6b5920c-44cb-4e23-9eb6-74a1c76bb485
- Repositórios base: cb3f6305-d441-465a-9158-a3e93fc01c62
- (outras refs específicas da skill)

## Versão
- 1.0 (YYYY-MM-DD) — design inicial.
```

Apresente o draft completo ao Bruno em code block. **PARE** e aguarde aprovação ou pedido de ajuste. Itere até OK.

### 4. Deploy nos repos ([CODE])

Pra cada repo em `Deploy em`:
1. Confirme branch existe (criar via `create_branch` se necessário; usar default branch como source).
2. `create_or_update_file` no caminho `.claude/skills/<slug>/SKILL.md`.
3. Reporte commit URL.

### 5. Registro na base Skills ([CODE])

Crie page na base Skills (`b6b5920c-44cb-4e23-9eb6-74a1c76bb485`) com:
- `Nome` = slug
- `Frase-gatilho`, `Pra que serve`, `Quando usar` (inputs do passo 1)
- `Versão atual` = "1.0"
- `Status` = "Ativa"
- `Origem` = input do passo 1
- `Deploy em` = relação aos URLs das pages da base Repositórios correspondentes aos repos
- `Changelog` = "1.0 (YYYY-MM-DD) — design inicial."
- Ícone (emoji) opcional

### 6. Install local ([PS])

**Aplicar checklist §4.2 da /executar antes de emitir:**
- Repos privados? → heredoc paste (não `Invoke-WebRequest`).
- Heredoc safe = ASCII puro (sem emojis/curly quotes) pra PS 5.1.
- Caminho absoluto: `$HOME\.claude\skills\<slug>\SKILL.md`.
- Idempotente: `Set-Content` + `New-Item -ItemType Directory -Force`.
- `-Encoding UTF8`.

Emita o handoff [PS] em bloco `powershell`, com a versão "enxuta" (ASCII-pure) do SKILL.md embedded.

### 7. Encerramento (pergunta-meta)

Aplique §5 da /executar:
1. Atualize a Aplicação (se houver) com Status Concluída + artefatos (URLs commits, link page Skills).
2. Resumo no chat: skill criada, deployada em N repos, registrada em Skills, install local pendente.
3. Pergunta-meta: melhorias na própria `/criar-skill`? Algum padrão de skill recém-aprendido que deveria virar template?
4. Se houver lições novas (ex: novo guard-rail pra [PS], novo campo na base Skills), aplique e bump versão da /criar-skill.

## O que NÃO fazer

- Não pule a coleta de inputs nem o draft com aprovação do Bruno.
- Não emita [PS] sem rodar o checklist §4.2 da /executar.
- Não registre na base Skills antes de confirmar o deploy nos repos.
- Não use `Invoke-WebRequest` pra repo privado.
- Não invente campos novos na base Skills sem perguntar ao Bruno.

## Referências

- /executar SKILL: catálogo Skills, page id `38c5523c-cba6-81bc-835a-e278e1d6bda3`
- Skills base: data_source `b6b5920c-44cb-4e23-9eb6-74a1c76bb485`
- Repositórios base: data_source `cb3f6305-d441-465a-9158-a3e93fc01c62`
- Guarda-chuva: https://app.notion.com/p/ef7e073499ff4d8e842f3ae024c7b150

## Versão

- 1.0 (2026-06-27) — design inicial. Workflow de 7 passos: coleta → validação → draft → deploy → registro Notion → install local → encerramento. Herda §4.2 da /executar pra [PS].

> Nota: changelog migra pra campo `Changelog` da page na base Skills.
