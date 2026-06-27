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
- A skill `/executar` está ativa — este fluxo segue a metodologia dela.

## Workflow

### 1. Coleta de inputs

Pergunte ao Bruno (em 1 bloco só):

```text
Pra criar a skill, preciso de:
1. Nome (slug minúsculo, ex: "revisar-ecossistema")
2. Frase-gatilho (ex: "/revisar-ecossistema")
3. Pra que serve (1-2 linhas)
4. Quando usar (1-2 linhas)
5. Deploy em quais repos? (default: TODOS Ativos da base Repositórios)
6. Origem: Própria / Comunidade / Importada (default: Própria)
```

### 2. Validação pré-deploy ([CODE])

- **Conflito de nome:** consulte base Skills por skill com mesmo Nome.
- **Branch nos repos alvo:** pra cada repo do Deploy em, conferir branch existe. Se NÃO, `create_branch` do default branch.
- **Visibilidade dos repos:** define se [PS] de install local usa `Invoke-WebRequest` (público) ou heredoc (privado).

### 3. Draft do SKILL.md ([CODE] + revisão [BRUNO])

Template canônico (estrutura da /executar v1.3):

```
---
name: <slug>
description: <quê + quando + frases-gatilho>
---

# Skill: <slug>

Ative SEMPRE que o usuário disser: <frases-gatilho>.

## Princípios
(adapte do /executar; herdar P5 e P6 se orquestra atores ou toca contas)

## Fluxo
### 1. Abertura
### 2. Layout (se aplicável)
### 3. Classificação dos passos (se orquestradora)
### 4. Loop
### 5. Encerramento (com pergunta-meta)

## O que NÃO fazer
## Referências
## Versão
- 1.0 (YYYY-MM-DD) — design inicial.
```

Apresente o draft completo em code block. PARE e aguarde aprovação. Itere até OK.

### 4. Deploy nos repos ([CODE])

Pra cada repo em Deploy em:
1. Confirmar branch existe (criar se não).
2. `create_or_update_file` em `.claude/skills/<slug>/SKILL.md`.
3. Reportar commit URL.

### 5. Registro na base Skills ([CODE])

Page nova em `b6b5920c-44cb-4e23-9eb6-74a1c76bb485` com Nome, Frase-gatilho, Pra que serve, Quando usar, Versão atual=1.0, Status=Ativa, Origem, Deploy em (relação), Changelog inicial.

### 6. Install local ([PS])

**Aplicar checklist §4.2 da /executar antes de emitir:**
- Repos privados → heredoc paste.
- Heredoc safe = ASCII puro pra PS 5.1.
- Caminho absoluto.
- Idempotente: `Set-Content` + `New-Item -Force`.
- `-Encoding UTF8`.

### 7. Encerramento (pergunta-meta)

Aplique §5 da /executar: atualize Aplicação, resumo, pergunta-meta. Lições novas → bump versão.

## O que NÃO fazer

- Não pule a coleta nem o draft com aprovação.
- Não emita [PS] sem checklist §4.2.
- Não registre na Skills antes de confirmar deploy.
- Não use `Invoke-WebRequest` pra repo privado.

## Referências

- /executar SKILL: `38c5523c-cba6-81bc-835a-e278e1d6bda3`
- Skills base: `b6b5920c-44cb-4e23-9eb6-74a1c76bb485`
- Repositórios base: `cb3f6305-d441-465a-9158-a3e93fc01c62`
- Guarda-chuva: https://app.notion.com/p/ef7e073499ff4d8e842f3ae024c7b150

## Versão

- 1.0 (2026-06-27) — design inicial. Workflow de 7 passos: coleta → validação → draft → deploy → registro Notion → install local → encerramento. Herda §4.2 da /executar.

> Nota: changelog migra pra campo `Changelog` da page na base Skills.
