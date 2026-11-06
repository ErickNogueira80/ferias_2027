# Alemanha 27 (Roteiro de Férias 2027)

App da viagem da família (Mônica, Milena e Erick) para Berlim, Copenhague e Wroclaw, de 25/01 a
14/02/2027. Tem calendário, endereços, checklist de bagagem, voos, tradutor e cronograma.

- **Área:** pessoal
- **Pasta:** `D:\Erick\EFKSolutions\Projetos\ferias_2027`
- **Repositório:** https://github.com/ErickNogueira80/ferias_2027 (público)
- **Onde roda:** GitHub Pages, em https://ericknogueira80.github.io/ferias_2027/ (publica sozinho a cada push na `main`)
- **App Android (casca):** `D:\Erick\EFKSolutions\Projetos\RoteiroFerias2027`. Abre este mesmo site, então não
  precisa gerar APK novo quando o site muda.

## Como instalar no celular (PWA)

1. No Chrome do Android, abra https://ericknogueira80.github.io/ferias_2027/
2. Menu ⋮ → **Instalar app** (ou "Adicionar à tela inicial").
3. O ícone "Alemanha 27" aparece na tela inicial e abre em tela cheia, como app.

No iPhone: Safari → Compartilhar → "Adicionar à Tela de Início". O "compartilhar link para o app"
só funciona no Android.

## O que a família faz sem depender do Erick

- **Checklist:** marcar itens e adicionar novos (aba 🎒 Checklist).
- **Links da Família:** em cada cidade há o card "🔗 Links da Família". Dá pra adicionar um link pelo
  botão ou, no Android, pelo Instagram: **Compartilhar → Alemanha 27**. O app abre com o link
  preenchido; é só escolher cidade, categoria e quem indicou. O × remove o link para todos.

Tudo isso é salvo na nuvem e aparece para todos em até 10 segundos.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O app inteiro (HTML, CSS e JS num arquivo só) |
| `manifest.webmanifest` | Nome, ícones, tela cheia e o "compartilhar para o app" (`share_target`) |
| `sw.js` | Service worker: busca a versão nova sempre e usa a cópia guardada quando está sem internet |
| `icons/` | Ícones (bandeira com avião, o mesmo desenho do app Android) |
| `index_watch.html` | Conceito de mostrador de relógio (separado, não faz parte do app) |

## Como alterar

Editar `index.html`, testar localmente (`python -m http.server` na pasta e abrir
http://localhost:8000), fazer commit e push na `main`. Em cerca de 1 minuto o GitHub Pages publica, e
os celulares pegam a versão nova na próxima abertura. Se mudar a lista de arquivos guardados
offline, troque a versão do `CACHE` no `sw.js`.

## Decisões

- **2026-11-06 · PWA no lugar de mandar APK a cada mudança.** O site no GitHub Pages é a fonte única.
  O APK passou a carregar o site.
- **Nuvem = Google Apps Script** (`API_URL` no `index.html`; planilha na conta Google do Erick).
  O script **só guarda verdadeiro/falso por chave**: textos enviados viram `false`. Por isso:
  - os itens novos do checklist aparecem com o nome tirado da chave (cortado em 25 caracteres);
  - cada link da família é gravado com os dados **dentro da chave**:
    `link-` + base64url(JSON `{c: cidade, k: categoria, t: título, u: url, p: quem, d: data}`).
    Valor `true` = visível, `false` = removido. Assim não foi preciso mexer no Apps Script.
- **Site público:** o conteúdo (endereços das hospedagens, localizador do voo) fica visível para quem
  tiver o link. O repositório já era público antes desta mudança.
- Os links de Instagram que já estavam no HTML (Comida, Supermercado etc.) continuam fixos; só os novos
  entram pelos "Links da Família".
