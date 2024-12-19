# MobyStk

Transforme seu Smartphone em um Gamepad para o PC.

Com o MobyStk, seu smartphone se converte em um gamepad versátil e personalizável, oferecendo uma alternativa útil para aqueles que não possuem um controle físico para PC.

[Instalação](#baixar-e-instalar)

![Tela principal do MobyStk](https://github.com/josejefferson/mobystk/assets/52979246/daaa80a2-ace0-46e7-be28-d49c0afa1e0a)

## Funcionalidades

- **Layouts Personalizados**\
  _Escolha entre layouts de PSP, PS2 e SNES, com a possibilidade de adicionar mais no futuro_

![Layouts](https://github.com/josejefferson/mobystk/assets/52979246/0a32fdcd-106a-44fb-bb84-34c9da9c040a)

- **Suporte a Múltiplos Toques**\
  _Capacidade de reconhecer até vários toques simultâneos_

![Múltiplos toques](https://github.com/josejefferson/mobystk/assets/52979246/7a0d1b3c-7a2a-430c-abdb-dccf4154aa9f)

- **Conecte até 4 Controles**\
  _Permite conectar até 4 smartphones ao mesmo PC para jogar com amigos_

![Tela de configuração do MobyStk](https://github.com/josejefferson/mobystk/assets/52979246/4ddafc98-1cdb-47de-9553-df8717d8f443)

- **Configuração Flexível**\
  _Ajuste as configurações de acordo com suas preferências_

- **Vibra com o Jogo**\
  _Vibrações sincronizadas com os comandos de vibração do jogo_

- **Personalização com Temas**\
  _Personalize a interface com temas de sua escolha_

- **Emulação de Controle de Xbox 360**\
  _Possibilidade de simular um controle de Xbox 360, conforme explicado na seção "[Utilizando gamepad virtual](#utilizando-gamepad-virtual)"_

- **Atualização fácil**\
  _O processo de atualização é fácil e com poucos cliques_

- **Instalação automática**\
  _Use o [MobyStk Installer](#baixar-e-instalar) para baixar e instalar automaticamente a versão mais recente, incluindo todas as bibliotecas necessárias e criar atalhos no computador_

## Tecnologias utilizadas

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![WebSocket](https://img.shields.io/badge/WebSocket-black?style=for-the-badge&logo=websocket&badgeColor=010101)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![esbuild](https://img.shields.io/badge/esbuild-%23ffcf00.svg?style=for-the-badge&logoColor=%23ffcf00)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Instruções de uso

### Baixar e instalar

A maneira mais simples e conveniente de obter o MobyStk é utilizando o [MobyStk Installer](https://github.com/josejefferson/mobystk-installer#readme). Este programa se encarrega de baixar e instalar automaticamente a versão mais atualizada do MobyStk, além de incluir as bibliotecas necessárias e criar atalhos no seu computador.

[Clique aqui para obter instruções sobre o MobyStk Installer](https://github.com/josejefferson/mobystk-installer#readme)

### Iniciar a aplicação

Para abrir o MobyStk, abra o arquivo `INICIAR.py`.

Abra a câmera do seu celular e escaneie o QRCode na tela ou digite o link fornecido.

![Tela principal do MobyStk no PC](https://github.com/josejefferson/mobystk/assets/52979246/055e5213-f78b-448a-b0ed-701097af67ff)

Selecione o tipo de controle desejado e clique em `JOGAR`

![Tela de configuração do MobyStk](https://github.com/josejefferson/mobystk/assets/52979246/4ddafc98-1cdb-47de-9553-df8717d8f443)

![Tela principal do MobyStk](https://github.com/josejefferson/mobystk/assets/52979246/daaa80a2-ace0-46e7-be28-d49c0afa1e0a)

> [!TIP]
> Para alternar para o modo de tela cheia, basta dar um duplo clique no relógio do centro da tela

## Atualizar a aplicação

Abra a pasta `MobyStk` e execute o arquivo `ATUALIZAR.py` para atualizar o MobyStk. Após isto, siga as instruções da tela.

## Utilizando gamepad virtual

Por padrão, o MobyStk utiliza um **teclado virtual**, mas é possível alterar essa configuração para simular um **gamepad virtual** (apenas disponível no Windows).

Para instalar o controle virtual, clique no botão Opções na janela principal do MobyStk.

![Tela principal do MobyStk no PC](https://github.com/josejefferson/mobystk/assets/52979246/055e5213-f78b-448a-b0ed-701097af67ff)

Depois clique em `Instalar controle virtual` e aguarde;

![Opções do MobyStk](https://github.com/josejefferson/mobystk/assets/52979246/79c110dc-6780-4798-8188-25543bc490b6)

Será solicitado que você instale os drivers de controle virtuais USB, prossiga com a instalação;

![Tela de instalação dos drivers](https://github.com/josejefferson/mobystk/assets/52979246/9a2687be-6741-49b0-acf9-0769a15db1ab)

Quando a instalação concluir, reinicie o MobyStk.

Abra as opções do MobyStk, caso apareça `AVISO: O controle virtual está com problemas` você vai precisar instalar os drivers manualmente, baixe através [deste link](https://github.com/nefarius/ViGEmBus/releases/download/v1.22.0/ViGEmBus_1.22.0_x64_x86_arm64.exe).

![Aviso do MobyStk](https://github.com/josejefferson/mobystk/assets/52979246/1b0bfb73-15ab-4587-ae9c-7b407f5261b4)

Após isso, abra o MobyStk no seu smartphone e marque a opção `Usar controle virtual`.

![Tela de configurações do MobyStk no smartphone](https://github.com/josejefferson/mobystk/assets/52979246/a0bed6d6-04c1-4293-97c2-9e5361601802)

### Proteção por senha

Se alguma pessoa não autorizada estiver conectada na mesma rede, ela poderá controlar seus jogos. Para evitar isto, ative a proteção por senha nas opções do MobyStk.

![Opções do MobyStk](https://github.com/josejefferson/mobystk/assets/52979246/b544cf44-d3ed-4ab7-92cd-f389e6e26399)
![Definir uma senha de acesso](https://github.com/josejefferson/mobystk/assets/52979246/46b22030-71de-40a4-9460-c0afd8856cf2)
