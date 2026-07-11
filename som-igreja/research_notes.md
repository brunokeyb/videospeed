# Notas de pesquisa — Som da Igreja (uso interno, para não repetir buscas)

> Atualize este arquivo a cada rodada nova. Antes de pesquisar de novo, checar aqui primeiro.

## Contexto do projeto
- Igreja ~50m (comprimento) x 20m (largura).
- Banda ao vivo com bateria acústica — precisa headroom.
- Mesa do cliente: **Soundcraft Ui24R**.
- Caixas laterais: formato coluna/line array branca.
- Zona do altar (~7 primeiros metros): 6 caixas — 2 atrás do padre (anguladas p/ padre), + outras anguladas diagonalmente p/ leitores e p/ ministros nas laterais. Preferência: coluna longa só que MENOR, ou pequena/discreta branca com resposta igual/superior.
- A partir dos 7m: distribuição ao longo da nave (config em aberto — ver pendências).
- Fundo da igreja: afunila para corredor de ~4-5m até porta central. Uma caixa horizontal ali (PENDENTE, incrementar depois).
- Coro (parte de cima): 2 caixas de linha (PENDENTE, tratar depois de consolidar a nave).
- Subgraves: 2 na frente (pontas/extremidades laterais perto do altar), possível expansão p/ 4 (+2 no fundo, nas extremidades, diagonal) — técnico levantou preocupação de cancelamento de fase entre subs distantes.
- Sub precisa ter crossover/filtro ativo embutido (não pode depender só de crossover externo).

## Caixa de referência
**Attack VSC83A Ativa Branca (Versa Red)**
- 8 x 3", ativa (amp embutido), formato torre/coluna
- Potência RMS: **divergência entre fontes** — ficha estruturada do Mercado Livre diz 335W; título de outros revendedores diz 670W ou 970W (kit); site oficial do distribuidor (Musiaudio) NÃO publica RMS. → precisa confirmar com fabricante antes de comprar.
- Cobertura: 120°H x 20°V
- Resp. freq.: 130Hz-15kHz (-6dB)
- SPL: 123dB pico / 122dB(A) @1m
- Conectores: XLR fêmea in / XLR macho loop thru
- Dimensões: 679 x 115,5 x 174mm | Peso 8,2kg
- Preço: **R$ 4.800 (Musiaudio, mesmo do link original — já é o melhor preço)**. Outros: X5 Music R$5.254-5.970, Loja Filadélfia R$5.390, Mundomax R$5.884.
- Versão passiva (VSC83): R$2.000 (precisaria amplificador externo, ~R$1.500-2.500/canal extra)
- Fontes: mercadolivre.com.br/p/MLB40399805 | musiaudio.com.br/caixa-de-som-coluna-amplificada-8x3-versa-red-attack-vsc83a.html | x5music.com.br/caixa-coluna-ativa-attack-vsc83a-a-8x3-pol/p | lojafiladelfia.com.br | mundomax.com.br

## Config B — caixa principal recomendada (6/lado nave)
**Staner SLR306S Ativa Branca**
- 120W RMS, 6x3", ativa
- Cobertura 160°H x 20°V
- Resp. freq. 120Hz-18kHz
- XLR in/out, 127/220V auto
- Dimensões 552x112x155mm, peso 7,06kg
- Preço: R$3.690 (Keepsound)
- Fonte: manual oficial staner.com.br/wp-content/uploads/2024/05/SLR-306-MANUAL.pdf | keepsound.com.br/caixa-tipo-coluna-vertical-ativa-120w-branca-slr-306s-staner-11612

## Retorno pequeno (candidato)
**Oneal OPB-404X Ativa Branca**
- 120W RMS (4 Ohms), musical 240W
- 4x4" + driver titânio
- Cobertura 60°H x 60°V
- Resp. freq. 100Hz-18kHz
- Dimensões: 602mm altura x 150mm largura x 160mm profundidade, peso 8,3kg
- Preço: R$1.113,95 a R$1.899 (média ~R$1.400)
- Fontes: carneiromusic.com.br, musicalcenter.com, kabum.com.br, x5music.com.br

## Candidatos para zona do altar (6 un., alcance curto ~7m, preferência qualidade vocal)
**Opção 1 — Staner SLR-504A Ativa Branca** (mesmo porte, mais qualidade)
- 350W, 4x5" + 4 tweeters neodímio 1" (resposta vocal superior)
- Cobertura 150°H x 20°V, SPL máx 115dB@1m/350W
- Mixer 2 canais embutido (XLR/TRS, EQ 2 bandas por canal, PRE-OUT/LINE-OUT)
- Dimensões 173x660x233mm (praticamente mesma altura da referência — NÃO é mais curta), peso 15,7kg
- Preço: ~R$3.878 (Mercado Livre) — variação entre lojas, um anúncio "par" a R$12.590 parece ser kit maior, desconsiderar.
- Fonte: keepsound.com.br/caixa-tipo-coluna-vertical-ativa-350w-branca-slr-504a-staner (fora de estoque no momento da consulta, specs confirmadas) | mercadolivre.com.br MLB-1684079401

**Opção 2 — Oneal OPB-404X Ativa Branca** (bem menor/discreta, mesma caixa do retorno)
- Ver specs acima. Mais compacta (60cm), mais barata, mas cobertura mais aberta (60°V, não é "coluna longa").

Obs: Attack não tem modelo de coluna mais curta na família Versa Red além da VSC83/VSC83A (só achei VSL206/VSL208/VSH206 — são line array 2 vias compactas, não colunas longas simples). Não aprofundado ainda — possível pendência se quiser opção Attack para o altar.

## Subwoofers
**Oneal OLS-1018BR Ativo** (recomendado, já tem crossover/filtro embutido)
- 18", 600W RMS, branco, linha EVO Line
- Crossover ajustável (CFA) 95-480Hz EMBUTIDO — atende exigência do filtro
- Inversor de fase (PHI) 0-180°
- Preço: R$2.349 a R$4.689 (variação grande entre lojas, média usada R$3.200)
- Fontes: audiodriver.com.br, timbres.com.br, kalifa.com.br

Alternativa: Oneal OPSB-3218X Ativo, 18", 600W, crossover ajustável 95-480Hz também embutido.

## Mesa Soundcraft Ui24R (do cliente)
- 8 saídas AUX balanceadas XLR + saída estéreo main XLR/P10
- Canais de entrada: EQ paramétrico 4 bandas, HPF, compressor, de-esser, gate
- Saídas: EQ gráfico 31 bandas, gate, compressor, RTA em todas entradas/saídas
- Main L/R: filtros HP/LP
- dbx AFS (supressor de feedback) aplicável a qualquer saída
- **NÃO tem**: delay/alinhamento de tempo dedicado por saída, nem matriz de zonas sofisticada — é EQ/dinâmica por canal/saída, não um processador de gerenciamento de caixas (speaker management).
- → Para alinhar tempo entre zonas (altar / nave / coro / entrada) distantes entre si, recomendar DSP externo dedicado (ex.: dbx DriveRack ou processador com delay) OU verificar se as caixas ativas escolhidas têm delay embutido (Staner Alive tem DSP embutido, Attack/Staner colunas simples não).
- 8 AUX dão para separar zonas (altar, nave, subs frente, subs fundo, coro, entrada) em envios independentes — útil para não somar tudo numa única mixagem.
- Fonte: soundcraft.com/en-US/products/ui24r, soundonsound.com/reviews/soundcraft-ui24r

## Comparação qualitativa de marca (Reclame Aqui)
**Attack Audio System**
- Sem reputação definida (poucas reclamações p/ RA calcular nota, <10)
- 3 reclamações, 100% respondidas, tempo médio resposta 7h
- Reclamações: defeito de produto, assistência técnica lenta/cara, sub Versa VRS1810a com relato de queima/curto (reclamação pontual)
- Fonte: reclameaqui.com.br/empresa/attack-audio-system/

**Staner**
- Sem reputação definida (<10 reclamações avaliadas)
- 5 reclamações, 100% respondidas, tempo médio resposta 2 dias e 14h
- Reclamações recorrentes no modelo SR315A (defeito, distorção, problema crônico mesmo após reparo)
- Marca pioneira no Brasil em line array (2007), especializada nisso
- Fonte: reclameaqui.com.br/empresa/staner/

**Leitura**: nenhuma das duas tem volume de reclamações suficiente para nota oficial — ambas são marcas nacionais de porte médio, com relatos pontuais de defeito (não incomum no segmento). Staner tem tempo de resposta mais lento nas reclamações registradas. Nenhuma delas é "premium" internacional (tipo JBL/RCF/QSC) — são a faixa nacional custo-benefício, adequada ao orçamento do projeto.

## Raciocínio — expansão de subgraves (2 → 4) e cancelamento de fase
- Cancelamento de fase forte (comb filtering) é fenômeno de curta/média distância entre fontes coerentes. A ~40-50m de separação entre um sub "da frente" e um "do fundo", as fontes já não somam como um único sistema coerente — a diferença de caminho é grande demais, cada ouvinte está dominado pela fonte mais próxima.
- Path prático (sem precisar de medição cara): não tratar os 4 subs como 1 sistema somado — dividir em 2 pares independentes (par frente / par fundo), cada um enviado por um AUX separado da Ui24R, com nível ajustado para cobrir só a área local. Isso evita ter que "alinhar" fontes muito distantes.
- Onde combinação de fontes próximas ocorre de fato (ex.: os 2 subs da mesma extremidade, lado a lado), aí sim vale manter a mesma polaridade e, se possível, medir com RTA/smaart no local — mas isso é ajuste fino de instalação, não algo que dê pra resolver só no papel.
- Conclusão prática: dá para colocar os 4 (2 frente + 2 fundo), tratando como 2 sistemas de reforço local independentes em vez de 1 sistema único — resolve a preocupação do técnico sobre cancelamento sem precisar de processamento caro.

## Layout revisado (rodada 3 — números fechados pelo cliente)
- 6m da entrada até a 1ª caixa virada pro povo; dali 43m de nave.
- Nave: **6 caixas por lado confirmado** (12 total), Staner SLR306S. Espaçamento real = 43/(6-1) = **8,6m** entre elas (não dá pra fazer 2-3m com só 6 unidades — isso exigiria 15+ por lado, não recomendado pra esse porte de sala).
- Altar: **4 caixas** (não são mais 6): 2 anguladas pro padre (centro) + 2 anguladas pras paredes (liturgia de um lado, ministros do outro). Opção 1 Staner SLR-504A (R$3.878/un, mesma altura da referência) ou Opção 2 Oneal OPB-404X (R$1.400/un, mais compacta).
- Entrada: 1 caixa horizontal — recomendado Oneal OPB-404X (reaproveita catálogo) ou Staner Alive 306A (upgrade, DSP embutido, mais caro, não cotado).
- Subgraves: **4 total** — 2 na frente (sob as 1as caixas viradas pro povo, no limite nave/altar) + 2 no fundo (cantos), ambos angulados pro centro. Não serão suspensos, todos no chão. Cliente quer rodinha + folga de cabo para limpeza (sem contraindicação técnica, só usar trava/freio na rodinha).
- Coro: números ainda inconsistentes entre si (citou 4m depois 6m de comprimento) — não fechar valor, só registrar como pendente. Tem área reservada pros músicos (já tem monitor próprio) + resto pra plateia com 2 caixas de referência.

## Análise técnica dos subgraves — já resolvida, não repetir pesquisa
- Grave (40-120Hz, λ~2,9-8,6m) não tem direcionalidade real numa caixa desse tamanho — "apontar" não mira o grave como mira a coluna principal, é mais estética/organização de cabo.
- Não existe "ponto de encontro" limpo de onda entre 2 fontes de grave coerentes — onde os níveis são parecidos (meio da nave) ocorre efeito pente (comb filtering), inevitável fisicamente.
- Na prática funciona porque a 40m+ de distância cada par domina sua própria metade — tratar como 2 pares independentes (aux separado na Ui24R), não como 1 sistema somado, evita depender de soma perfeita.
- Canto do fundo = vantagem (reforço de carregamento de canto, grave "de graça"), não desvantagem. Meio da nave (ideia do técnico) é bloqueado por cadeiras nas laterais — problema prático real, não só teórico.
- DSP com delay é refinamento opcional, não obrigatório pro resultado ser bom.

## Total estimado atual (Cenário C, layout revisado)
- Nave 12x SLR306S = R$44.280
- Altar 4x SLR-504A = R$15.512 (ou 4x OPB-404X = R$5.600)
- Entrada 1x OPB-404X = R$1.400
- Subs 4x OLS-1018BR = R$12.800
- Total (altar opção 1): R$73.992 | Total (altar opção 2): R$64.080
- Coro ainda não entra no total.

## RESOLVIDO — RMS real da Attack VSC83A (fonte primária, manual técnico oficial)
Fonte: https://www.attack.com.br/repositorio/manuais-setups/vsc83/manual-tecnico-vsc83a.pdf (Manual Técnico oficial Attack, seção "Amplificador"/"Potência Total", pág. 3 de 5). Acessado via Chrome (PDF renderiza como imagem, não dá pra extrair texto via fetch — só visualizando).
- Amplificador: Classe D
- Potência dinâmica total (RMS): **2 x 335 Wrms @ 4Ω** (ou seja, 335W RMS é o valor POR CANAL — a caixa é bi-amplificada/2 canais)
- Potência de pico total (RMS): 2 x 670 Wrms @ 4Ω
- **Conclusão**: somando os 2 canais, a potência dinâmica (contínua) total da caixa é 670W RMS — o que bate com o que vários revendedores anunciam como "670W RMS" (eles estão citando o total dos 2 canais, não errado, só sem detalhar). O "335W" que aparecia no campo estruturado do Mercado Livre era só o valor de 1 canal. O pico total (2 canais) é 1.340W. O "970W" de um kit específico provavelmente inclui a passiva junto, não é comparável.
- Proteções: sobretensão, subtensão, curto-circuito, temperatura, DC, limiter individual por canal, audio starting fader — é proteção/limiter, não é DSP completo (sem EQ paramétrico, sem crossover programável, sem preset de EQ).

## Processador/DSP embutido — comparação real entre os modelos (fonte primária quando possível)
- Attack VSC83A: só limiter/proteção (ver acima). Sem DSP completo.
- Staner SLR306S: manual de instalação oficial (staner.com.br/wp-content/uploads/2024/05/SLR-306-MANUAL.pdf) é só manual de montagem física (suportes, angulação) — não tem tabela de specs nem menção a DSP. Specs de potência/cobertura vieram de busca (não confirmadas em manual técnico dedicado). Não há indicação de DSP nessa linha.
- Staner SLR-504A: mixer 2 canais com EQ 2-bandas por canal — é EQ básico analógico, não DSP digital completo.
- Staner Alive 306A (opção upgrade p/ caixa de entrada): TEM DSP embutido confirmado (crossover Linkwitz-Riley 24dB/8ª, compatível Ease Focus) — é a única da lista com DSP de verdade.
- Oneal OPB-404X: sem menção a DSP nas fichas encontradas — só ativa básica.
- Oneal OLS-1018BR (sub): tem crossover ativo ajustável (CFA 95-480Hz) + inversor de fase (PHI 0-180°) embutidos — atende o requisito do "filtro", mas não é um DSP multibanda completo, é um crossover/fase ajustável.

## Nota técnica — ambiente de arquivo (não repetir erro)
Notei instabilidade entre o mount bash (/sessions/.../mnt/outputs) e os file tools (Read/Write/Edit) neste projeto — o mount bash ficou com cópia desatualizada/truncada do HTML por vários minutos mesmo após escritas bem-sucedidas via Write/Edit. Os file tools (Read) são a fonte de verdade real do que é entregue ao usuário. Validar arquivos grandes lendo com Read (offset/limit cobrindo o arquivo todo) em vez de confiar no bash pra HTML grande.

## Rodada 4 — Potência & Headroom (resposta ao impasse "distribuir × potência")
Impasse do cliente: SLR306S (120W) tem muito menos watt que a Attack VSC83A (670W) → medo de sistema distribuído "fraco" p/ banda com bateria. RESOLVIDO na aba Potência & Headroom do HTML e na seção 13 do dados_completos.

Argumentos-chave (não repetir pesquisa):
- Watt ≠ volume: dobrar potência = +3dB; 670W vs 120W = só ~+7,5dB SPL máx.
- Distância consome potência (inverso do quadrado): jogar 40m custa ~1.600× vs cobrir de perto. Distribuído cada caixa cobre ~2-5m → não precisa ser 670W.
- Potência TOTAL do sistema (colunas+sub): nave SLR-504A (6.600W) > Attack concentrado Cenário A (6.560W). O "1.440W" era só a coluna mais fraca somada sozinha.
- Quem compete com a bateria é o SUB (4×18"=2.400W), não a coluna. Coluna só precisa headroom de VOZ → 350W resolve.
- Distribuir e ter potência não são opostos: subir de modelo no MESMO layout 6/lado.

Recomendação nave (3 tiers, todos vertical 20°, distribuídos):
- Staner SLR306S 120W, ~108-110dB (estimado, SPL não publicado), R$3.690 — FORA DE ESTOQUE (Keepsound/Brug). Descartada.
- **Staner SLR-504A 350W, 115dB CONFIRMADO, 4×5"+4tw, tweeter de voz, ~R$3.878, 12un=R$46.536 → RECOMENDADA** (≈mesmo preço da 306S, ~3× potência).
- Attack VSC83A 670W, 123dB pico, R$4.793, 12un=R$57.516 → opção de topo (mesma marca da referência).

Caixas novas levantadas (fontes na seção 13 do dados_completos):
- SoundBox SB 2.6 (500W/129dB pico, mas vertical 70° = largo demais p/ nave comprida) — alternativa de SPL bruto.
- SoundBox SB 4.6 (500W/132dB, 4×6", 28kg, vertical 80°).
- Attack Versa VRV-206A branca (350W biamp/123dB, 100°H, preço a cotar) — mesma marca, mais potência que SLR306S.
- Oneal OLA-2600-BR (350W RMS/700W prog, 114dB cont., R$5-6,3k, mais cara).
- Leacs L5 ativa (500W/120dB pico, branca+ativa a confirmar).
- LL Audio C200 (300W, 94dB sens = menos headroom, barata).
- Antera LA 2.06 (250W, SPL não publicado, preço stale).

Premium ("existe caixa melhor?"): RCF EVOX J8 (branca, ~R$11,5k, DSP real, mas coluna+sub p/ 1-2 pontos), EV Evolve 50 (branca, 127dB, ~R$15,9k), JBL PRX One (130dB, DSP+delay, só preta, ~R$15k+), Bose Panaray MSA12X (branca, beam-steering instalação, ~R$17-27k/un encomenda — o correto de engenharia p/ nave comprida, mas 3-5× o custo). Veredito: p/ orçamento/conceito atual, Attack/Staner são o tier certo; upgrade inteligente = subir a coluna da nave, não pular pro premium.

Ressalvas: SPL pico ≠ SPL contínuo (não misturar). Sites BR bloqueiam fetch → confirmar preço/estoque com clique humano no fechamento.

## Pendências / não pesquisado ainda
- [x] ~~Confirmar RMS real da Attack VSC83A~~ → RESOLVIDO (manual técnico: 670W RMS = 2×335, ver seção RESOLVIDO)
- [x] ~~Impasse distribuir × potência~~ → RESOLVIDO (rodada 4, recomendação SLR-504A p/ nave)
- [ ] Escolha final da coluna da nave: SLR-504A (recomendada) x Attack VSC83A (topo) — diferença R$10.980 no total
- [ ] Caixa horizontal para porta central (corredor ~4-5m no fundo)
- [ ] 2 caixas de linha para o coro (zona de cima)
- [ ] Opção Attack para zona do altar (coluna curta) — não encontrada ainda, pode não existir na linha
- [ ] Preço fechado/atualizado do Oneal OLS-1018BR (grande variação, cotar no fechamento)
- [ ] Confirmar preço/estoque à vista/Pix da SLR-504A branca e da Attack VSC83A branca no fechamento
- [ ] DSP externo específico recomendado (modelo/preço) para alinhamento de delay entre zonas
