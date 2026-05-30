# Ordem de Tráfego — Gerador

Página estática para preencher e gerar PDFs de Ordem de Tráfego com distribuição automática de KM, banco de locais e integração com Claude.ai.

## Como usar

Abra `index.html` no navegador. Funciona 100% offline (depois que o `pdf-lib` é carregado da CDN). Todos os dados ficam salvos no `localStorage` do navegador.

### Hospedagem (opcional)

- **GitHub Pages**: ative Pages apontando para a pasta `tools/ordem-trafego/`
- **Local**: `python3 -m http.server 8000` na pasta e acesse `http://localhost:8000`
- **Offline**: basta clicar duas vezes no `index.html` (alguns navegadores podem bloquear o fetch do `template.pdf` via `file://` — nesse caso use a opção local)

## Fluxo

1. **Campos fixos**: preencha uma vez (placa, condutor, CNH, etc). Ficam salvos.
2. **Período**: data inicial/final + KM inicial/final. Clique em "Reconstruir dias úteis" — gera linhas pulando sábado/domingo/feriados nacionais.
3. **Editar linhas**:
   - `≡` arrasta para reordenar
   - `🔒` trava o KM (ex: dia da viagem a Brasília com 113 km fixo)
   - `+` insere linha (ex: incluir sábado)
   - `×` exclui linha (ex: feriado regional)
4. **Distribuir KM**: clique "Redistribuir KM" — divide o KM restante entre as linhas não-travadas com variação ±20%, soma exata.
5. **Locais e demandas**: preencha manualmente ou use Claude.
6. **Claude**: clique "Gerar prompt para Claude", copie, cole no Claude.ai (plano Max), copie a resposta JSON e cole de volta. Aplica nas linhas.
7. **Assinatura**: faça upload de uma foto/PNG da assinatura. O fundo branco é removido automaticamente.
8. **Gerar PDF**: salva e marca o período como "último" para herança no próximo.

## Arquivos

- `index.html` — interface
- `style.css` — estilos
- `app.js` — estado, lógica de distribuição, geração de PDF
- `holidays.js` — calculadora de feriados nacionais brasileiros (incluindo Carnaval, Sexta-feira Santa, Corpus Christi)
- `template.pdf` — modelo base do formulário
- `README.md` — este arquivo

## Backup

Use os botões "Exportar dados" / "Importar dados" no cabeçalho para fazer backup do `localStorage` (campos fixos, locais, demandas, assinatura, última ordem). Útil ao trocar de navegador ou limpar cache.

## Coordenadas do PDF

As coordenadas de cada campo no PDF estão em `app.js` no objeto `COORD`. Se algum campo sair desalinhado, ajuste ali (sistema de coordenadas: origem inferior-esquerda, unidade = pontos PDF; página A4 = 595×841 pt).
