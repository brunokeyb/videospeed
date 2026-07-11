# Sistema de PA da Igreja — Dados Completos do Projeto

Documento de exportação com tudo o que foi levantado nas rodadas de pesquisa (specs, preços, fontes, decisões, layout, análises técnicas). Preparado para uso em outra ferramenta/IDE (Claude Code).

## Arquivos que acompanham este projeto

Estes arquivos estão na mesma pasta e contêm a mesma informação em formatos diferentes — deixe-os junto com este `.md` para o Claude Code ter acesso a tudo:

- **`som_igreja_comparativo.html`** — a página HTML com abas já construída (Resumo, Cenário C, Ficha técnica, Comparativo, Qualidade das marcas, Mesa & DSP, Cenário A, Cenário B, Pendências, Fontes). É um arquivo único, autocontido (CSS+JS inline, sem dependência externa exceto os links de fonte), pronto pra abrir no navegador ou servir como está. Se o próximo passo for continuar/expandir essa página (por exemplo, adicionar a zona do coro, a caixa da porta central, ou transformar em algo interativo), este é o arquivo-base a editar.
- **`research_notes.md`** — notas de pesquisa cruas, em formato mais telegráfico, incluindo uma seção específica sobre uma instabilidade de sincronização de arquivo encontrada neste ambiente (mount bash vs. ferramentas de arquivo) que vale considerar se for reescrever o HTML por script.
- **`dados_completos_som_igreja.md`** (este arquivo) — versão consolidada e legível de tudo, pensada como a referência principal.

---

## 1. Contexto do projeto

- Igreja: aproximadamente **50m de comprimento x 20m de largura**.
- Uso: banda ao vivo com **bateria acústica** — sistema precisa de headroom (folga de potência) para tocar limpo competindo com o volume da bateria.
- Mesa de som do cliente: **Soundcraft Ui24R** (já possuem, não faz parte do orçamento).
- Preferência estética: caixas em formato coluna/line array, cor **branca**.
- Objetivo declarado pelo cliente: distribuição "leve" — mais pontos de som com potência individual menor, em vez de poucos pontos de alta potência, para cobertura mais uniforme e menos desconforto perto das caixas.
- Existe um técnico de áudio consultado em paralelo pelo cliente; parte desta pesquisa serve para levar fundamentação técnica a ele.

### 1.1 Layout físico da igreja (conforme descrito pelo cliente, por zona)

- **Fundo → primeira caixa da nave:** 6m.
- **Nave:** 43m de extensão (após os 6m iniciais), com 6 caixas por lado (12 no total). Espaçamento resultante: 43 ÷ (6-1) = **~8,6m entre caixas**.
- **Altar:** zona dos primeiros metros junto ao palco/altar, com 4 caixas — 2 anguladas diagonalmente para o padre (centro), 2 anguladas no sentido contrário para as paredes laterais (uma cobrindo o grupo de liturgia/leitores, outra cobrindo o grupo de ministros).
- **Fundo da igreja / entrada:** afunila para um corredor de ~4-5m de largura até a porta central. Prevista 1 caixa horizontal ali, para atender pessoas que ficam na porta em dias de lotação (item ainda genérico, incrementado depois).
- **Subgraves:** 2 na frente (sob as primeiras caixas da nave, próximo à fronteira nave/altar) + 2 no fundo (cantos/extremidades), ambos os pares angulados diagonalmente para o centro. Todos os subs ficarão no chão (nenhum suspenso). Cliente quer rodinhas nos subs + folga de cabo para facilitar limpeza (sem contraindicação técnica; só usar trava/freio na rodinha).
- **Coro (parte de cima):** largura igual à da nave. De frente para o altar, a parede do lado direito tem uma zona de ~6m (a partir do canto, em direção ao centro) reservada para os músicos, que já têm sistema de monitor próprio (fora do escopo desta pesquisa). Passado esse trecho, ficam 2 caixas: uma logo após os 6m (angulada diagonalmente para o centro) e outra na extremidade oposta (também angulada para o centro), ambas cobrindo a plateia que senta no coro. **Números de comprimento do coro ainda inconsistentes entre si** (o cliente citou 4m e depois 6m em momentos diferentes) — pendente de confirmação antes de fechar modelo/potência dessas 2 caixas.

---

## 2. Especificações completas por equipamento

### 2.1 Attack VSC83A Ativa Branca (Versa Red) — caixa de referência original

- Tipo: coluna line array ativa (amplificador embutido), formato torre.
- Transdutores: 8 x 3".
- **Potência RMS (fonte primária — manual técnico oficial):** amplificador Classe D, 2 canais. Potência dinâmica total (RMS) = **2 x 335 Wrms @ 4Ω** → ou seja, 335W é o valor **por canal**; somando os 2 canais o total contínuo real da caixa é **670W RMS**. Potência de pico total = 2 x 670 Wrms @ 4Ω = **1.340W de pico**.
  - Isso resolve a divergência encontrada nos anúncios: revendedores que citam "670W RMS" estão somando os 2 canais (correto); o campo estruturado do Mercado Livre trazia só "335W" (um canal só). Um anúncio de kit citava "970W", que provavelmente mistura a ativa com a passiva — não é comparável diretamente.
- Cobertura: 120° horizontal x 20° vertical.
- Resposta de frequência: 130Hz – 15kHz (-6dB). Range de operação: 120Hz-20kHz.
- Resposta de fase: 40° @ 300Hz / -40° @ 15kHz.
- SPL médio linear: 105dB(Z)/104dB(A) campo livre @1m; 111dB(Z)/110dB(A) plano ao terra @1m.
- SPL de pico linear: 117dB(Z)/116dB(A) campo livre @1m; **123dB(Z)/122dB(A) plano ao terra @1m** (o número mais citado nos anúncios).
- Conectores de áudio: XLR fêmea de entrada e XLR macho loop thru. Impedância de entrada: 10kΩ Unbal / 20kΩ Bal.
- Conector AC: IP44-3P AC Input, NBR 14.136-8A Output. Fonte chaveada, range 100-240VAC rms.
- Latência: 5,9ms.
- Proteções: sobretensão, subtensão, curto-circuito, temperatura, DC, limiter individual por canal, audio starting fader. **Isso é proteção/limiter, não é DSP completo** — sem EQ paramétrico, sem crossover digital programável.
- Dimensões: 679mm (A) x 115,5mm (L) x 174mm (P). Peso: 8,2kg.
- Acessórios compatíveis: suportes de parede (30/60/100cm), suporte tubo inferior, junções de içamento e traseiras.
- Indicado para: igrejas (citado no próprio manual, entre outras aplicações).
- **Preço:** R$ 4.800 (Musiaudio — mesmo vendedor do anúncio original do Mercado Livre; já é o melhor preço encontrado). Outros revendedores: X5 Music R$5.254 (pix) / R$5.970 (18x); Loja Filadélfia R$5.390; Mundomax R$5.884.
- Versão passiva equivalente (Attack VSC83, sem amplificador): R$2.000-2.022 — precisaria de amplificador externo (~R$1.500-2.500 por canal/par adicional), não compensa claramente para instalação nova.
- Fontes: 
  - https://www.mercadolivre.com.br/p/MLB40399805 (anúncio original)
  - https://musiaudio.com.br/caixa-de-som-coluna-amplificada-8x3-versa-red-attack-vsc83a.html
  - https://www.attack.com.br/repositorio/manuais-setups/vsc83/manual-tecnico-vsc83a.pdf (Manual Técnico oficial — fonte primária do RMS)
  - https://www.attack.com.br/repositorio/manuais-setups/vsc83/manual-de-operacao-vsc83-vsc83a.pdf (Manual de Operação oficial)
  - https://www.attack.com.br/versa-red-series/colunas/vsc83a/181 (página oficial do produto)
  - https://www.attack.com.br/versa-red-series/colunas/vsc83/180 (versão passiva)
  - https://www.x5music.com.br/caixa-coluna-ativa-attack-vsc83a-a-8x3-pol/p

### 2.2 Staner SLR306S Ativa Branca — recomendada para a nave (Cenário C)

- Tipo: coluna line array ativa (Stellaris series / compact line array system).
- Potência RMS: 120W.
- Transdutores: 6 x 3".
- Cobertura: 160° horizontal x 20° vertical.
- Resposta de frequência: 120Hz – 18kHz.
- Conectores: XLR in/out.
- Alimentação: 127/220V automático.
- Dimensões: 552 x 112 x 155mm. Peso: 7,06kg.
- Gabinete: alumínio extruído, cores branca ou preta. Chave seletora de sonoridade no gabinete (posição "Music" e outra, conforme aplicação).
- **DSP:** não encontrado nenhuma menção a DSP completo nos materiais oficiais disponíveis. O manual disponível publicamente (staner.com.br) é só manual de instalação física (suportes/angulação), sem tabela de especificações elétricas nem menção a processamento digital.
- **Preço:** R$ 3.690 (Keepsound).
- Fontes:
  - https://staner.com.br/wp-content/uploads/2024/05/SLR-306-MANUAL.pdf (manual de instalação oficial — 8 páginas, sem tabela de specs elétricas)
  - https://www.keepsound.com.br/caixa-tipo-coluna-vertical-ativa-120w-branca-slr-306s-staner-11612

### 2.3 Staner SLR-504A Ativa Branca — opção 1 para o altar

- Tipo: coluna line array ativa, com mixer de 2 canais embutido.
- Potência: 350W.
- Transdutores: 4 x 5" + 4 tweeters neodímio de 1" (resposta vocal superior à das colunas simples de 3").
- Cobertura: 150° horizontal (1kHz-4kHz, ±15°) x 20° vertical (2kHz-18kHz, ±10°).
- SPL máximo: 115dB @1m / 350W.
- Mixer embutido: 2 canais de entrada, XLR/TRS 1/4" (MIC/LINE), canal 2 com entrada RCA, EQ de 2 bandas em cada canal — **é EQ básico analógico, não é DSP digital completo**. Saídas PRE-OUT e LINE-OUT (jack TS 1/4").
- Alimentação: 127/220Vac ~60Hz, comutação automática.
- Dimensões: 173 (L) x 660 (A) x 233mm (P) — **praticamente a mesma altura da caixa de referência (679mm); não é uma versão "mais curta"**. Peso: 15,7kg (quase o dobro da SLR306S).
- **Preço:** ~R$3.878 (Mercado Livre). Havia um anúncio de "par" a R$12.590 que parece ser um kit maior/diferente — desconsiderado.
- Fontes:
  - https://www.keepsound.com.br/caixa-tipo-coluna-vertical-ativa-350w-branca-slr-504a-staner
  - https://produto.mercadolivre.com.br/MLB-1684079401-line-array-vertical-staner-slr-504s-ativa-branca-_JM

### 2.4 Oneal OPB-404X Ativa Branca — retornos / opção 2 para o altar / caixa de entrada

- Tipo: caixa ativa vertical (torre compacta), não é formato "coluna longa".
- Potência: 120W RMS @ 4Ω (musical 240W).
- Transdutores: 4 x 4" + driver de titânio.
- Cobertura: 60° horizontal x 60° vertical (bem mais aberta que as colunas line array).
- Resposta de frequência: 100Hz – 18kHz.
- Conector: XLR.
- Dimensões: 602mm (altura) x 150mm (largura) x 160mm (profundidade). Peso: 8,3kg.
- **Preço:** R$1.113,95 a R$1.899 (faixa entre lojas; usado R$1.400 como média/estimativa de trabalho).
- Fontes:
  - https://www.carneiromusic.com.br/caixa-ativa-oneal-opb-404-x-torre-4-falantes-4-polegadas-120w-rms-4-ohms-branca-/p
  - musicalcenter.com, kabum.com.br, x5music.com.br (mesma faixa de preço)

### 2.5 Staner Alive 306A — opção de upgrade (caixa de entrada / única com DSP real)

- Tipo: line array ativo compacto, bi-amplificado, DSP embutido.
- Potência: dupla amplificação, máximas 400W + 160W; RMS 250W + 80W.
- Transdutores: 2 x 6" + driver de 1,75".
- Crossover: Linkwitz-Riley 24dB/8ª ordem @ 2kHz, **DSP embutido de verdade** (única caixa da lista com essa característica), compatível com software Ease Focus.
- Cobertura horizontal: 100° com ajuste de tilt até 15°. Cobertura vertical: não informada nas fontes consultadas.
- Resposta de frequência: 75Hz – 19kHz.
- **Preço:** não cotado (não priorizado nesta rodada); estimativa é de ser mais cara que a OPB-404X, dado o recurso de DSP.
- Fonte: https://www.megasom.com.br/audio-e-tecnologia/line-array/line-array-ativo-staner-alive-306a

### 2.6 Oneal OLS-1018BR Ativo Branco — subgrave recomendado (x4)

- Tipo: subgrave ativo, linha EVO Line (mesma família visual "line array").
- Transdutor: 18".
- Potência: 600W RMS.
- Crossover ativo ajustável embutido (CFA): 95Hz – 480Hz — **atende a exigência do cliente de ter o filtro na própria caixa**.
- Inversor de fase (PHI): 0° a 180°.
- Proteção térmica eletrônica ajustável (ETP).
- Construção: madeira E1 (sem ácido fórmico), pintura em resina bicomponente, tela de aço azul-escuro com pintura eletrostática.
- **Preço:** R$2.349 a R$4.689 (grande variação entre lojas — cotar no fechamento). Usado R$3.200 como média de trabalho.
- Fontes:
  - https://www.audiodriver.com.br/produto/caixa-ativa-grave-para-line-array-18-600w-rms-oneal-ols-1018-br-branca.html
  - https://www.timbres.com.br/subwoofer-ativo-oneal-line-array-18-ols1018br-branco

### 2.7 Oneal OPSB-3218X — subgrave alternativo

- 18", 600W RMS, crossover ativo ajustável embutido 95-480Hz (mesma faixa do OLS-1018BR).
- Não confirmado disponível em branco (as fontes consultadas mostravam preto).
- Preço em faixa parecida à do OLS-1018BR, não fechado.
- Fontes: megadisconildo.com.br, keepsound.com.br, x5music.com.br, audiodriver.com.br

---

## 3. Outras opções encontradas na pesquisa (não aprofundadas / não escolhidas)

Levantadas nas buscas iniciais por caixas line array brancas ativas de potência intermediária (~150-300W), mas não aprofundadas porque a Staner SLR306S/SLR-504A e a Oneal OPB-404X já cobriram as necessidades do projeto com dados mais completos:

- **LL Audio / Donner C825** — passiva, 200W RMS @ 8Ω, 8 falantes, gabinete metal branco, conectores Speakon. (jjmusical.com.br, casadeiinstrumentos.com.br, miyatamusic.com.br)
- **LL Audio C100** — par ativa+passiva, 200W RMS @ 4Ω (100+100W), woofer 3x4" full-range, resposta 140-16.000Hz, branca. (amazon.com.br, shopee.com.br)
- **Line Array C425** — passiva, 200W, disponível em preto ou branco. (edsomaudiovideo.com.br)
- **Oneal Vertical Line Ativa OPB 604+** — 6x4", 200W RMS, mas só encontrada em preto (não atende ao requisito de branco). (erplandmusic.com.br)
- **Oneal OLB-602** — line array branco, achado com 51% de desconto (R$1.115) num anúncio de mostruário; specs não aprofundadas. 
- **Par Line Array C200 Ativa/Passiva "Igreja"** — 300W RMS, anúncio explicitamente voltado para igrejas, R$3.136 (com desconto R$2.666).
- **Donner C200P** — line vertical, 150W RMS, branca, vendida em par por R$1.620.
- **Donner Vert 3000** — 750W RMS, subwoofer 15" + satélite 2x6"+tweeter, formato vertical.
- **HH TNA-1800S** — subwoofer line array, 1x18", 500W AES / 2000W pico, opção branca sujeita a pedido mínimo.
- **ARMER EVX18SUB** — subwoofer ativo 18", 600W RMS, SPL máx 129dB, indicado para igrejas.
- **Oneal OLA 2060 BR** — line array 2x6" branca, R$4.560.
- **Oneal OPSB-2500 / OPSB-3110 / OPSB-3404X** — outros subgraves ativos Oneal em potências menores (170W a média potência), não priorizados por não serem 18".

---

## 4. Cenários de configuração (evolução ao longo da pesquisa)

### 4.1 Cenário A — padrão original de referência (primeira rodada)

4 caixas Attack VSC83A por lado (8 no total) + 2 retornos + 2 subgraves, sem separação de zona do altar.

| Item | Qtd. | Preço unit. | Subtotal |
|---|---|---|---|
| Attack VSC83A Ativa Branca | 8 | R$ 4.800 | R$ 38.400 |
| Oneal OPB-404X Ativa Branca (retorno) | 2 | R$ 1.400 | R$ 2.800 |
| Subgrave Oneal OLS-1018BR | 2 | R$ 3.200 | R$ 6.400 |
| **Total** | | | **R$ 47.600** |

Potência elétrica total nas principais: 8 x 670W (real, após correção) = 5.360W.

### 4.2 Cenário B — nave distribuída, sem separar zona do altar (segunda rodada)

6 caixas Staner SLR306S por lado (12 no total) + 4 retornos pequenos + 2 subgraves.

| Item | Qtd. | Preço unit. | Subtotal |
|---|---|---|---|
| Staner SLR306S Ativa Branca | 12 | R$ 3.690 | R$ 44.280 |
| Oneal OPB-404X Ativa Branca (retorno) | 4 | R$ 1.400 | R$ 5.600 |
| Subgrave Oneal OLS-1018BR | 2 | R$ 3.200 | R$ 6.400 |
| **Total** | | | **R$ 56.280** |

Potência total: 12x120W + 4x120W = 1.920W.

### 4.3 Cenário C — layout por zona (versão final, mais aderente ao briefing)

Nave (6/lado, 43m, ~8,6m de espaçamento) + Altar (4 caixas) + Entrada (1 caixa) + Subgraves (4, sendo 2 frente + 2 fundo). Coro ainda não entra no total (pendente).

| Item | Qtd. | Preço unit. | Subtotal |
|---|---|---|---|
| Staner SLR306S Ativa Branca (nave) | 12 | R$ 3.690 | R$ 44.280 |
| Staner SLR-504A Ativa Branca (altar, opção 1) | 4 | R$ 3.878 | R$ 15.512 |
| Oneal OPB-404X Ativa Branca (caixa da entrada) | 1 | R$ 1.400 | R$ 1.400 |
| Subgrave Oneal OLS-1018BR (2 frente + 2 fundo) | 4 | R$ 3.200 | R$ 12.800 |
| **Total (altar opção 1 — Staner SLR-504A)** | | | **R$ 73.992** |
| **Total (altar opção 2 — Oneal OPB-404X, R$1.400 x4 = R$5.600 em vez de R$15.512)** | | | **R$ 64.080** |

Potência total nave: 12 x 120W = 1.440W. Potência total altar (opção 1): 4 x 350W = 1.400W.

### 4.4 Tabela de sensibilidade de espaçamento na nave

| Caixas por lado | Espaçamento aprox. | Total de caixas (12/18/30) | Custo total (nave) | Leitura |
|---|---|---|---|---|
| 6 (escolhido) | ~8,6m | 12 | R$ 44.280 | Recomendado — já é apertado o suficiente para coluna com 20° de abertura vertical, dentro do padrão para esse porte de igreja |
| 9 | ~5,4m | 18 | R$ 66.420 | Mais uniforme, mas 50% mais caro — só compensa se sobrar "buraco" de cobertura com 6 |
| 15+ | ~2,9m (o que o cliente chegou a mencionar) | 30 | R$ 110.700+ | Não recomendado — sobreposição excessiva de cobertura, custo desproporcional |

---

## 5. Ficha técnica comparativa (matriz completa)

| Funcionalidade | Attack VSC83A | Staner SLR306S | Staner SLR-504A | Oneal OPB-404X | Staner Alive 306A |
|---|---|---|---|---|---|
| Amplificação ativa embutida | ✅ Classe D, 2 canais | ✅ Ativa, 1 canal | ✅ Ativa + mixer 2ch | ✅ Ativa, 1 canal | ✅ Ativa bi-amplificada |
| Bi-amplificação (2+ canais internos) | ✅ 2 canais x 335W | ❌ 1 canal só | ❌ 1 canal de saída | ❌ 1 canal só | ✅ 2 vias, 250W+80W |
| DSP completo (EQ paramétrico / crossover digital) | ❌ só limiter/proteção | ❌ não encontrado | ❌ EQ 2-bandas analógico | ❌ não encontrado | ✅ Linkwitz-Riley 24dB |
| Potência RMS confirmada em manual do fabricante | ✅ 670W total (335x2), pico 1.340W | ❌ 120W — só ficha comercial | ❌ 350W — só ficha comercial | ❌ 120W — só ficha comercial | ❌ 250+80W — só ficha comercial |
| Falantes | 8x3" | 6x3" | 4x5"+4 tweeter 1" | 4x4"+driver | 2x6"+driver 1,75" |
| Cobertura estreita e controlada (line array) | ✅ 120°H x 20°V | ✅ 160°H x 20°V | ✅ 150°H x 20°V | ❌ 60°H x 60°V (bem mais aberta) | ✅ 100°H (vertical n/i) |
| SPL máximo informado | ✅ 123dB pico @1m | ❌ não informado | ✅ 115dB @1m | ❌ não informado | ❌ não informado |
| Disponível em branco | ✅ | ✅ | ✅ | ✅ | ✅ |
| Peso ≤10kg | ✅ 8,2kg | ✅ 7,06kg (mais leve) | ❌ 15,7kg (quase o dobro) | ✅ 8,3kg | ❌ não informado |
| Preço unitário ≤ R$4.000 | ❌ R$4.800 (mais cara) | ✅ R$3.690 | ✅ R$3.878 | ✅ R$1.400 (mais barata) | ❌ não cotada (estimada mais cara) |

### 5.1 Subgraves — mesmo formato

| Funcionalidade | Oneal OLS-1018BR | Oneal OPSB-3218X |
|---|---|---|
| Crossover/filtro ajustável embutido | ✅ CFA 95-480Hz + fase 0-180° | ✅ CFA 95-480Hz + fase |
| Potência RMS confirmada em manual do fabricante | ❌ 600W — só ficha comercial | ❌ 600W — só ficha comercial |
| Falante | ✅ 18" | ✅ 18" |
| Disponível em branco | ✅ | ❌ não encontrado em branco |
| Preço unitário | R$2.350-4.690 (grande variação) | Faixa parecida, não fechada |

---

## 6. Avaliação final (veredito da ficha técnica)

- **Nave (12 un.):** Staner SLR306S vence — mais barata que a Attack (R$3.690 x R$4.800), mais leve, cobertura horizontal maior (160° x 120°) com a mesma cobertura vertical de 20° (o que controla o alcance ao longo da nave). Nenhuma das duas tem DSP, então isso não pesa nessa comparação específica.
- **Altar (4 un.):** troca real é preço x qualidade vocal. Staner SLR-504A custa quase o mesmo que a SLR306S mas pesa o dobro (15,7kg) — o ganho é o tweeter dedicado para voz (importante para padre/leitores). Oneal OPB-404X é 64% mais barata mas com cobertura muito mais aberta (60°x60°), menos controlada.
- **Attack VSC83A (referência):** depois de confirmado o RMS real (670W) em manual oficial, é de fato a mais potente e com o melhor SPL confirmado da lista — mas também é a mais cara, e a decisão de comprá-la de novo só faz sentido se potência bruta pesar mais que economia.
- **DSP:** nenhuma caixa da faixa de preço principal (R$1.400-4.800) tem processador completo — é recurso de categoria acima (Staner Alive 306A). Se o alinhamento de tempo entre zonas for prioridade, o caminho é um DSP externo dedicado, não trocar de caixa.
- **Preço no geral:** Oneal OPB-404X (R$1.400) é disparada a mais barata e mais leve de toda a lista, mas com cobertura mais aberta — funciona bem como retorno/entrada, não como caixa principal da nave. Fora ela, ordem de preço do mais barato pro mais caro: Staner SLR306S → Staner SLR-504A → Attack VSC83A → Staner Alive 306A (estimada).

---

## 7. Análise técnica dos subgraves (para o técnico de áudio)

**Plano do cliente:** 2 subs na frente (sob as primeiras caixas viradas para o povo) + 2 subs no fundo, nos cantos, ambos angulados diagonalmente para o centro — intenção de que as "ondas se encontrem" no meio sem cancelar.
**Plano do técnico consultado:** 2 na frente + 2 no meio da nave — mas o meio tem cadeiras nas laterais, o que interrompe fisicamente essa opção.
Nenhum sub será suspenso; todos ficarão no chão.

| Ponto técnico | O que acontece de fato |
|---|---|
| Grave "aponta" mesmo? | Não do jeito que uma coluna aponta. Nas frequências de subgrave (40-120Hz, comprimento de onda de ~2,9 a 8,6m), a caixa é pequena demais perto do comprimento de onda para ter direcionalidade real — o grave sai quase igual em todas as direções, suspenso ou não. Angular o gabinete ajuda a organizar cabo/estética, mas não "mira" o grave como mira a coluna principal. |
| "As ondas se encontram sem cancelar" | Fisicamente não existe um ponto de encontro limpo. Onde os dois pares tocam com nível parecido (região central da nave), ocorre soma e cancelamento alternados dependendo da posição exata de quem está ouvindo (efeito pente / "comb filtering") — inevitável fisicamente quando duas fontes de grave coerentes se sobrepõem. |
| Por que a ideia funciona na prática mesmo assim | A 40-43m de distância entre o par da frente e o par do fundo, cada um domina fortemente sua própria metade da nave — a região onde os dois níveis são realmente parecidos (onde o efeito pente incomoda) é uma faixa estreita no meio, não a igreja inteira. Tratando frente e fundo como **dois reforços locais independentes** (cada par no seu próprio envio/aux da Ui24R, no seu próprio nível), não se depende de soma perfeita — cada ouvinte recebe grave decente da fonte mais próxima. |
| Cantos do fundo — problema ou vantagem? | **Vantagem.** Sub no chão, encostado em canto (duas ou três superfícies refletoras — parede + piso, ou parede+parede+piso) ganha reforço natural de grave por carregamento de canto — mais grave "de graça", sem gastar potência extra. |
| Por que não no meio (ideia do técnico)? | Tecnicamente funcionaria, mas o cliente já identificou o problema prático: cadeiras nas laterais bloqueiam essa posição. Colocar nos cantos do fundo resolve isso sem perda técnica relevante — e ainda ganha o reforço de canto que o meio da nave não teria. |

**Conclusão prática para o técnico:** pode seguir com 2 subs na frente + 2 no fundo (cantos), tratados como dois pares independentes na mesa (sem tentar somá-los como um sistema único). Isso evita o problema de cancelamento levantado, aproveita o reforço de canto no fundo, e contorna o obstáculo das cadeiras. Se no futuro quiserem os dois pares soando como um sistema mais "costurado" (sem diferença perceptível na transição), aí entra um DSP com delay para alinhar os tempos — não é obrigatório para o resultado ser bom, é refinamento opcional.

**Sobre rodinhas e folga de cabo para limpeza:** sem contraindicação técnica — reforçar com o instalador para usar trava/freio na rodinha (o sub não deslizar com a vibração durante o uso) e deixar sobra de cabo enrolada perto da caixa (não esticada), para aguentar o arrasto na hora da faxina sem forçar o conector.

---

## 8. Fundamentação de engenharia de áudio (por que "mais caixas, menos potência" faz sentido)

- **Lei do inverso do quadrado da distância:** cada vez que a distância entre a caixa e o ouvinte dobra, é preciso 4x mais potência (+6dB) para manter o mesmo volume. Numa nave comprida (50m), poucas caixas muito potentes precisam "jogar" o som por uma distância grande — criando excesso de volume perto delas e queda de nível no fundo, além de excitar mais a reverberação da sala ao longo do caminho.
- **Sistema distribuído:** distribuir mais pontos de som ao longo da lateral encurta a distância que cada caixa precisa cobrir. Se a distância de cobertura cai pela metade, a potência necessária por caixa cai para 1/4 — por isso colunas de menor potência, mais próximas entre si, cobrem a mesma área com boa uniformidade e sensação de volume mais confortável. Esse princípio é chamado de "sistema distribuído" na literatura de sonorização (ex.: Yamaha Sound Reinforcement Handbook, guias AVIXA), recomendado para salas compridas e estreitas como naves de igreja, em vez de sistema concentrado (poucos pontos de alta potência).
- **Resposta direta à pergunta "dá pra usar menos caixas e ter resultado igual ou melhor?":** para uma geometria retangular alongada como essa (50x20m), não é o caminho recomendado — concentrar potência em menos pontos tende a piorar a uniformidade e aumenta a energia total jogada na sala, prejudicando inteligibilidade em ambientes reverberantes.
- **Headroom para banda com bateria:** bateria acústica gera de 100 a 110dB SPL na fonte. Para o PA "vencer" a bateria com folga e sem distorcer, cada caixa deveria ter reserva de potência de pelo menos 10dB acima do nível médio de operação. SPL alvo típico: 85-95dB(A) médio na plateia para música ao vivo em igreja.
- **Pontos que só dá para calcular com medição no local:** tempo de reverberação (RT60) real da igreja; altura/ângulo exato de instalação de cada coluna; necessidade de DSP com delay para alinhamento de fase entre zonas; potência real de amplificação considerando impedância/cabeamento para o número final de caixas.

---

## 9. Mesa Soundcraft Ui24R — o que ela resolve e o que não resolve

| Recurso | Tem? | Observação |
|---|---|---|
| Saídas AUX independentes | Sim — 8 XLR balanceadas | Dá para separar altar / nave / subs frente / subs fundo / coro / entrada em envios próprios, sem misturar tudo numa saída só |
| EQ por canal e por saída | Sim | Paramétrico 4 bandas nas entradas; gráfico de 31 bandas nas saídas |
| Compressor / gate / de-esser | Sim | Em todos os canais de entrada |
| Supressor de feedback (dbx AFS) | Sim | Aplicável a qualquer saída — útil para os microfones do altar |
| Filtro HP/LP | Sim, no main L/R | Não confirmado nas 8 saídas AUX individualmente — verificar no manual/no local |
| Delay / alinhamento de tempo entre zonas | **Não é o forte dela** | É uma mesa digital compacta, não um processador de gerenciamento de caixas (speaker management). Não substitui um DSP dedicado quando há várias zonas fisicamente distantes (altar, nave, fundo, coro) que precisam ser alinhadas em tempo |

**Recomendação:** para o Cenário C funcionar bem com zonas separadas por distância real, vale considerar um processador de DSP externo dedicado (tipo dbx DriveRack ou similar) entre a mesa e os amplificadores/caixas ativas — especialmente porque nenhuma caixa da lista principal tem DSP/delay embutido (só a Staner Alive 306A tem). Esse item ainda não foi orçado.

Fontes: https://www.soundcraft.com/en-US/products/ui24r | https://www.soundonsound.com/reviews/soundcraft-ui24r

---

## 10. Análise qualitativa de marca (Reclame Aqui)

### Attack Audio System
- Marca nacional com décadas de mercado, catálogo amplo (colunas, subs, line array, acessórios).
- Reclame Aqui: sem nota de reputação oficial (volume de reclamações baixo demais pra calcular, <10). 3 reclamações encontradas, 100% respondidas, tempo médio de resposta ~7h.
- Reclamações encontradas: defeito de produto, assistência técnica lenta/cara em alguns relatos, um caso pontual de sub Versa (VRS1810a) com relato de queima/curto — tratar como incidente isolado, não como padrão comprovado.
- Fonte: https://www.reclameaqui.com.br/empresa/attack-audio-system/

### Staner
- Pioneira no Brasil em line array (primeira marca nacional a lançar linha completa em 2007) — forte especialização nesse formato específico.
- Reclame Aqui: também sem nota oficial (volume baixo). 5 reclamações, 100% respondidas, tempo médio de resposta mais lento (~2 dias e 14h) que a Attack.
- Reclamações concentradas no modelo SR315A (caixa multiuso, não é o modelo indicado neste projeto) — distorção e defeito recorrente em alguns relatos, incluindo após reparo.
- Manual técnico de instalação completo e público (SLR-306) — mais transparência de documentação que a Attack nesse caso específico (embora sem tabela de specs elétricas).
- Fonte: https://www.reclameaqui.com.br/empresa/staner/

### Leitura geral
Ambas são marcas nacionais de faixa custo-benefício — não são marcas "premium" internacionais (JBL Professional, RCF, QSC), que custam bem mais. Nenhuma das duas tem volume de reclamações suficiente no Reclame Aqui para uma nota confiável; os relatos existentes são pontuais. Staner tem a seu favor ser especialista histórica em line array; Attack tem tempo de resposta mais rápido nas reclamações registradas, mas ficha técnica menos transparente (RMS não publicado no site comercial, só no manual técnico). Vale pedir a opinião do técnico por experiência de campo, que pesa mais que pesquisa de reputação pública.

---

## 11. Pendências (itens ainda não fechados)

- [ ] Escolher entre Opção 1 (Staner SLR-504A) e Opção 2 (Oneal OPB-404X) para as 4 caixas do altar — diferença de R$9.912 no total do projeto.
- [ ] Confirmar medida real do coro (cliente citou 4m e depois 6m de comprimento em momentos diferentes) — necessário para definir modelo/potência das 2 caixas de referência de lá.
- [ ] Definir se será necessário DSP externo para alinhamento de delay entre zonas (altar/nave/fundo/coro), e qual modelo — nenhuma caixa da lista principal tem isso embutido.
- [ ] Cotação fechada e atualizada dos subgraves (Oneal OLS-1018BR, variação de R$2.350 a R$4.690 entre lojas) e da caixa de entrada.
- [ ] Modelo e formato definitivo da caixa horizontal da porta central (segue como sugestão genérica de reaproveitar a Oneal OPB-404X, não aprofundado com opções específicas para instalação horizontal).
- [ ] Caso quisesse uma opção 100% Attack para o altar: a marca não tem, na linha Versa Red, nenhuma coluna mais curta que a VSC83A (só o modelo de 8x3", 679mm) — não pesquisado a fundo se existe em outras linhas da Attack.

---

## 12. Notas operacionais (ambiente técnico desta pesquisa)

- Durante a produção do HTML consolidado, foi identificada uma instabilidade entre o mount bash do ambiente (usado para validação via script) e as ferramentas de arquivo (Read/Write/Edit) — o mount bash chegou a mostrar uma cópia desatualizada/truncada do arquivo por vários minutos mesmo após escritas bem-sucedidas. As ferramentas de arquivo (Read) são a fonte de verdade real do conteúdo entregue. Relevante caso o próximo passo em Claude Code também precise validar arquivos grandes.
- Especificações de potência RMS anunciadas em lojas de revenda (Mercado Livre, sites de instrumentos musicais) frequentemente divergem entre si e do manual técnico oficial do fabricante — sempre que possível, a fonte primária (manual técnico em PDF no site do fabricante) foi priorizada sobre anúncios comerciais. Isso só foi possível de forma confiável para a Attack VSC83A (manual técnico com tabela de specs completa); para as demais marcas/modelos, os números vêm de fichas comerciais de revenda.

---

## 13. Análise de Potência & Headroom (rodada 4 — resposta ao impasse "distribuir × potência")

**Contexto do impasse:** o cliente percebeu que a caixa distribuída recomendada (Staner SLR306S, 120W) tem potência muito menor que a caixa de referência (Attack VSC83A, 670W), e ficou com receio de que o sistema distribuído ficasse "limitado em watts" para uma banda com bateria acústica. Esta seção resolve isso. Consolidada na aba **Potência & Headroom** do HTML.

### 13.1 Por que a comparação de watts engana
1. **Watt ≠ volume.** Dobrar a potência = só +3dB. 670W vs 120W (5,6×) = ~+7,5dB de SPL máximo, não "5,6× mais alto". Percepção de "dobro de volume" exige +10dB.
2. **A distância é que consome potência (lei do inverso do quadrado).** −6dB a cada vez que a distância dobra; repor 6dB exige 4× a potência. 1m→0dB/1×; 4m→−12dB/16×; 8m→−18dB/64×; 40m→−32dB/~1.600×. Concentrar potência em poucos pontos que "jogam" 40m é o que realmente gasta watt e alimenta a reverberação da sala.
3. **No distribuído cada caixa trabalha de perto (~2-5m do ouvinte mais próximo)** — não precisa ser um monstro de 670W para entregar SPL confortável e limpo.

### 13.2 A conta que importa — potência TOTAL do sistema (colunas + subs)
| Configuração | Colunas | Subs | Total (nave+sub) |
|---|---|---|---|
| Cenário A — Attack concentrado (8) | 8×670W = 5.360W | 2×600W = 1.200W | 6.560W |
| Cenário C — nave SLR306S (12) | 12×120W = 1.440W | 4×600W = 2.400W | 3.840W |
| **Cenário C — nave SLR-504A (12)** | 12×350W = 4.200W | 4×600W = 2.400W | **6.600W** |
| Cenário C — nave Attack VSC83A (12) | 12×670W = 8.040W | 4×600W = 2.400W | 10.440W |

**Achado-chave:** trocando só a coluna da nave para a SLR-504A, o distribuído passa a ter MAIS potência total (6.600W) que o Attack concentrado do Cenário A (6.560W) — e melhor espalhada (4 subs vs 2). O "1.440W" que assustou era só a coluna mais fraca somada sozinha.

### 13.3 Quem "compete com a bateria" é o SUB, não a coluna
Bateria acústica (100-110dB) concentra energia no grave/médio-grave. Quem dá peso/soco são os 4 subs de 18" (2.400W). As colunas cuidam de voz/médios/agudos e só precisam de **headroom para manter a voz limpa por cima** — 350W resolve com folga. A preocupação de potência estava certa no princípio (headroom importa) mas mirando a caixa errada.

### 13.4 O impasse era uma escolha falsa
"Distribuir" e "ter potência" não são opostos — pareciam porque a coluna escolhida (SLR306S) era a mais barata E a mais fraca. Basta subir de modelo mantendo o mesmo layout distribuído (6/lado).

### 13.5 As 3 opções de coluna para a nave (todas distribuídas, 6/lado, vertical 20°)
| Item | Staner SLR306S | **Staner SLR-504A (recomendada)** | Attack VSC83A |
|---|---|---|---|
| Potência | 120W | **350W** | 670W (2×335) |
| SPL máx @1m | ~108-110dB (estimado, não publicado) | **115dB (confirmado)** | 123dB pico (confirmado) |
| Alto-falantes | 6×3" | 4×5" + 4 tweeters 1" | 8×3" |
| Vertical | 20° | 20° | 20° |
| Tweeter de voz dedicado | não | **sim** | não |
| Peso | 7,06kg | 15,7kg | 8,2kg |
| Preço unit. | R$ 3.690 (fora de estoque) | ~R$ 3.878 | R$ 4.793 |
| 12 unidades | R$ 44.280 | **R$ 46.536** | R$ 57.516 |
| Headroom p/ banda | no limite | confortável | sobra |

**Recomendação:** SLR-504A é o ponto de equilíbrio (≈3× a potência da 306S por só ~R$2.256 a mais no total; SPL confirmado; tweeters de voz; mantém vertical de 20°). Attack VSC83A distribuída = máximo de headroom na marca da referência (+~R$11k vs SLR-504A). SLR306S descartada para este uso (headroom no limite + fora de estoque em Keepsound/Brug na consulta atual).

### 13.6 Novas caixas levantadas nesta rodada
- **SoundBox SB 2.6 Ativa Branca** — 500W RMS, 129dB pico, 2×6"+driver titânio 1.5", 140°H×**70°V**, 100Hz-20kHz, 19kg, ~R$3.949-4.482. Limiter inteligente + correção de fase automática (não é DSP de usuário). **Porém:** vertical de 70° não é line array estreito — em nave comprida/reverberante espalha energia no piso/teto e alimenta reverberação. Melhor para salas curtas/menos reverberantes. Fica como alternativa de "SPL bruto", não recomendação principal. Fontes: soundboxbrasil.com.br/sb-2-6-ativa/ ; ninjasom.com.br ; lojasertaneja.com.br.
- **SoundBox SB 4.6** — 500W, 132dB pico, 4×6", 140°×80°V, 28kg, ~R$5k+. Mesma ressalva de vertical largo, mais pesada.
- **Attack Versa VRV-206A Branca** — 350W biamp (100W high/250W low), 123dB pico, 2×6"+driver, 100°H, 80Hz-18kHz. Mesma marca da referência, mais potência que a SLR306S. Preço não confirmado (cotar). Fontes: nssom.com.br, chinasom.com.br, mercadaodamusica.com.br.
- **Oneal OLA-2600-BR** — 700W programa/350W RMS, 114dB contínuo (120dB ground-plane)/126-132 pico, 2×6"+driver titânio, 100°H×15°V, 24kg, ~R$5.005-6.316 (a nacional mais cara). Fontes: mercadaodamusica.com.br, kalifaprime.com.br.
- **Leacs Vertical Line L5 Ativa** — 500W RMS, 98dB sens/120dB pico, 4×5"+4 tweeters 1", 100°H×30°V, 70Hz-20kHz (melhor grave do grupo compacto), 15kg. Branca+ativa a confirmar (passiva branca confirmada). Fonte: leacs.com.br.
- **LL Audio C200 Ativa Branca** — 300W RMS (150+150), 94dB sens (a mais baixa, menos headroom), 4×4"+driver, 120°H×60°V, 100Hz-16kHz. Boa/barata para voz, fraca para banda cheia. Fonte: llaudio.com.br.
- **Antera LA 2.06** — 250W RMS, 2×6.5"+tweeter, 120Hz-16kHz, 20kg. SPL não publicado; preço só referência stale (2014). Cotar. Fonte: keepsound.com.br.

### 13.7 "Existe uma caixa melhor?" — tier premium (fora do orçamento/conceito atual)
| Modelo | Tipo | Pot./SPL | Branca? | Preço BR aprox. | Pegadinha |
|---|---|---|---|---|---|
| RCF EVOX J8 | Coluna+sub 12" (1 peça) | 1.400W / ~123dB, DSP real | Sim | ~R$ 11.500 | Feita p/ 1-2 posições, não distribuir 6/lado |
| Electro-Voice Evolve 50 | Coluna+sub 12" | 1.000W / 127dB | Sim | ~R$ 15.900 | Idem, muda o conceito |
| JBL PRX One | Coluna+sub 12", DSP+delay | 2.000W pico / 130dB | Só preta | ~R$ 15k+ | Não vem branca; 1-2 pontos |
| Bose Panaray MSA12X | Coluna de instalação, beam-steering por DSP | 600W, vertical direcionada eletronicamente | Sim (MSA12X-W) | ~R$ 17-27k/un (encomenda) | A "ferramenta certa" p/ nave comprida, mas 3-5× o custo + projeto acústico |

**Veredito:** portáteis (EVOX/Evolve/PRX) são salto real mas feitos p/ 1-2 posições — distribuí-los desmonta o projeto. Colunas de instalação beam-steering (Bose MSA12X, RCF Vasa/L-Pad) são distribuíveis e são o correto de engenharia p/ igreja comprida reverberante, mas custam 3-5× e pedem projeto acústico. Para o orçamento/conceito atual (distribuído, marca nacional custo-benefício), **Attack/Staner são o tier certo**. O upgrade inteligente é subir a coluna da nave (SLR-504A ou Attack), não pular pro premium.

### 13.8 Ressalvas de dados
- SPL da SLR306S nunca publicado (manual staner.com.br bloqueado ao fetch automatizado); ~108-110dB é estimativa de engenharia (deriva da SLR-504A 115dB@350W e da SLR-208 115dB voz/110dB música, descontando driver menor e menos potência).
- SPL "pico/máximo" (SoundBox 129/132, Attack 123, Leacs 120) não é comparável direto a SPL "contínuo/@potência nominal" (Staner 115, Oneal 114 cont.) — não misturar as duas colunas de número.
- Preços de sites BR (musiaudio, x5music, reference, staner) bloqueiam fetch automatizado; valores vêm de snippets de busca — confirmar Pix/à-vista com clique humano antes de cotar. Attack VSC83A branca melhor preço confirmado ~R$4.793 (Musiaudio).
- "1.340W pico" da Attack é extrapolação 2× do RMS; nenhuma fonte publicou o pico explicitamente (só 670W RMS confirmado).
