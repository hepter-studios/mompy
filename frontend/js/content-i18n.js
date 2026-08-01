"use strict";

// Educational copy is localized separately so Python code and expected output
// remain identical in every language.
window.MOMPY_CONTENT_I18N = {
  "pt-BR": {
    missions: {
      mission_001: ["Missão 01 — Primeira saída", "Primeiro passo: faça o programa escrever uma mensagem no console.", "Use print() para mostrar exatamente: Hello, Mompy!", "Use aspas dentro de print: print(\"Hello, Mompy!\")"],
      mission_002: ["Missão 02 — Texto", "Mostre uma mensagem de texto no console.", "Mostre exatamente: Python", "Escreva o texto entre aspas dentro de print()."],
      mission_003: ["Missão 03 — Parênteses", "Complete um comando print com aspas e parênteses corretos.", "Mostre exatamente: Boot ready", "Use print(\"Boot ready\"). Confira as aspas e os parênteses."],
      mission_004: ["Missão 04 — Outra mensagem", "Pratique mais uma saída de texto simples.", "Mostre exatamente: Mompy", "Use print(\"Mompy\"). Não esqueça as aspas."],
      mission_005: ["Missão 05 — Duas linhas", "Um programa pode executar vários comandos em sequência.", "Mostre First e depois Second, cada um em sua própria linha.", "Use dois comandos: print(\"First\") e print(\"Second\")."],
      mission_006: ["Missão 06 — Variável", "Guarde um texto em uma variável e use seu nome depois.", "Crie name = \"Mompy\" e depois mostre name com print().", "Depois de criar a variável, use print(name). Não coloque name entre aspas dentro de print."],
      mission_007: ["Missão 07 — Valor numérico", "Variáveis também podem guardar números.", "Crie level = 1 e mostre level.", "Use print(level). Números não precisam de aspas."],
      mission_008: ["Missão 08 — Mudar valor", "Uma variável pode receber um novo valor.", "Comece com mode = \"off\", mude para \"on\" e mostre mode.", "Atribua mode = \"on\" antes de usar print(mode)."],
      mission_009: ["Missão 09 — Soma simples", "Use valores guardados para fazer uma conta.", "Some a e b para mostrar 5.", "Use print(a + b)."],
      mission_010: ["Missão 10 — Variável de texto", "Guarde uma mensagem e recupere o valor pelo nome.", "Guarde \"Ready\" em message e mostre message.", "Use print(message), sem aspas ao redor de message."],
      mission_011: ["Missão 11 — If verdadeiro", "Use uma condição para decidir se um bloco será executado.", "Use if para mostrar exatamente: Ready", "Use if power: e, dentro dele, print(\"Ready\")."],
      mission_012: ["Missão 12 — Maior que", "Compare um número antes de executar uma ação.", "Se temperature for maior que 5, mostre Warm.", "Use if temperature > 5: e, dentro dele, print(\"Warm\")."],
      mission_013: ["Missão 13 — Igualdade", "Compare textos com o operador de igualdade.", "Se code for igual a \"py\", mostre Python.", "Use if code == \"py\": e, dentro dele, print(\"Python\")."],
      mission_014: ["Missão 14 — Else", "Crie um caminho alternativo para uma condição falsa.", "Com score = 1, mostre Try again usando if e else.", "Use if score >= 2: para Pass e else: para print(\"Try again\")."],
      mission_015: ["Missão 15 — Menor ou igual", "Comparações como <= também ajudam o programa a decidir.", "Se count for menor ou igual a 3, mostre Inside.", "Use if count <= 3: e, dentro dele, print(\"Inside\")."],
      mission_016: ["Missão 16 — Laço com range", "Repita um bloco percorrendo uma sequência de números.", "Use range(3) para mostrar 0, 1 e 2.", "Dentro do for, use print(i). A linha de print precisa estar indentada."],
      mission_017: ["Missão 17 — Repetir texto", "Use repetição para evitar comandos duplicados.", "Mostre Mompy duas vezes usando for e range.", "Dentro do for, use print(\"Mompy\")."],
      mission_018: ["Missão 18 — Começar no um", "Escolha onde uma sequência numérica começa e termina.", "Use range(1, 4) para mostrar 1, 2 e 3.", "Dentro do for, use print(number)."],
      mission_019: ["Missão 19 — Percorrer letras", "Um for também pode percorrer os caracteres de um texto.", "Mostre as letras de \"py\", uma por linha.", "Dentro do for, use print(letter)."],
      mission_020: ["Missão 20 — Soma no laço", "Atualize uma variável a cada repetição.", "Some 0, 1 e 2 com for e mostre 3.", "Dentro do for, use total = total + number. Depois do for, use print(total)."],
      mission_021: ["Missão 21 — Criar lista", "Agrupe vários valores em uma única variável.", "Crie uma lista com \"onion\", \"terminal\" e \"python\" e mostre a lista.", "Use items = [\"onion\", \"terminal\", \"python\"] e print(items)."],
      mission_022: ["Missão 22 — Índice da lista", "Acesse um item pela posição que ele ocupa.", "Mostre o segundo item da lista.", "O segundo item é items[1]. Use print(items[1])."],
      mission_023: ["Missão 23 — Append", "Adicione um novo valor ao final de uma lista.", "Adicione 4 a [1, 2, 3] e mostre a lista.", "Use numbers.append(4) e depois print(numbers)."],
      mission_024: ["Missão 24 — Percorrer lista", "Visite cada item de uma lista com for.", "Mostre cada item da lista, um por linha.", "Use for item in items: e, dentro dele, print(item)."],
      mission_025: ["Missão 25 — Tamanho da lista", "Conte quantos itens existem em uma lista.", "Mostre quantos números estão na lista.", "Use print(len(numbers))."],
      mission_026: ["Missão 26 — Função simples", "Crie um bloco de código reutilizável com um nome.", "Crie say_hello() para mostrar Hello e depois chame a função.", "Dentro da função, use print(\"Hello\"). Depois chame say_hello()."],
      mission_027: ["Missão 27 — Parâmetro", "Envie um valor para dentro de uma função.", "Crie greet(user) e chame com \"Mompy\" para mostrar Hello, Mompy.", "Use print(\"Hello, \" + user) dentro da função e depois greet(\"Mompy\")."],
      mission_028: ["Missão 28 — Return", "Faça uma função devolver o resultado de uma operação.", "Crie add(a, b), retorne a + b e mostre add(2, 3).", "A função deve usar return a + b. Depois use print(add(2, 3))."],
      mission_029: ["Missão 29 — Retornar texto", "Monte e devolva uma mensagem a partir de um parâmetro.", "Crie make_message(user) e mostre Hello, Mackson.", "Retorne \"Hello, \" + user e depois use print(make_message(\"Mackson\"))."],
      mission_030: ["Missão 30 — Resultado da função", "Funções ajudam a organizar uma pequena regra sob um nome.", "Crie double(n), retorne n * 2 e mostre double(4).", "Use return n * 2 dentro da função. Depois use print(double(4))."]
    },
    briefings: {
      briefing_001: {
        title: "Apresentação do bloco 01", subtitle: "Primeiros comandos em Python",
        steps: [
          ["O que é Python?", "Python é uma linguagem de programação. Você escreve instruções e o computador as executa uma por uma.", "Pense em Python como uma forma de conversar com o computador por comandos escritos. Cada comando precisa ser claro."],
          ["Instruções", "Uma instrução é um pequeno comando. O computador não adivinha sua intenção; ele segue exatamente o que foi escrito.", "Uma linha de código pode ser como uma ordem: faça isto agora. Se o comando estiver errado, o resultado também estará."],
          { question: "Python é usado para:", options: ["escrever instruções para o computador", "decorar a tela do computador", "conectar cabos físicos"], successText: "Correto. Python permite escrever instruções para o computador executar.", failText: "Quase. Python não é decoração nem um cabo físico; é uma linguagem para escrever instruções." },
          ["Texto e aspas", "Quando queremos que Python trate algo como texto, normalmente usamos aspas. Elas dizem: isto é uma mensagem.", "Sem aspas, Python tenta entender a palavra como o nome de algo. Com aspas, ele entende como texto."],
          ["Mostrar na tela", "Uma das primeiras ideias é pedir ao programa para mostrar uma mensagem. Em Python, print é o comando básico para isso.", "print é uma forma simples de enviar uma mensagem ao console e ver o resultado do programa."]
        ]
      },
      briefing_002: {
        title: "Apresentação do bloco 02", subtitle: "Variáveis e valores",
        steps: [
          ["Guardar informações", "Uma variável é um nome que guarda um valor. Você usa esse nome depois para recuperar a informação.", "Imagine uma etiqueta em uma caixa. A etiqueta é o nome da variável; o conteúdo é o valor."],
          ["Atribuição", "Em Python, o sinal de igual coloca um valor em um nome. Isso se chama atribuição.", "Ao escrever name = value, você diz: guarde este valor neste nome."],
          { question: "Em uma variável, o sinal = significa:", options: ["guardar um valor em um nome", "mostrar uma tela", "apagar o programa"], successText: "Correto. O sinal de igual atribui um valor a um nome.", failText: "Ainda não. Aqui, o sinal de igual é usado para guardar um valor em uma variável." },
          ["Usar o valor", "Depois que uma variável existe, você pode usar seu nome em comandos. Python procura o valor guardado.", "Você não precisa repetir o valor. Use o nome da variável e Python recupera seu conteúdo."]
        ]
      },
      briefing_003: {
        title: "Apresentação do bloco 03", subtitle: "Decisões",
        steps: [
          ["Condição", "Uma condição é uma pergunta com resposta verdadeira ou falsa. Programas usam isso para escolher caminhos.", "Pense em uma porta: se a condição for verdadeira, o programa passa; se for falsa, segue outro caminho."],
          ["if", "O if executa um bloco somente quando a condição é verdadeira. A indentação mostra o que pertence ao bloco.", "if significa: se algo for verdadeiro, execute as linhas indentadas abaixo."],
          { question: "Um if é usado para:", options: ["tomar uma decisão no programa", "mudar a fonte do editor", "criar som ambiente"], successText: "Correto. O if cria caminhos diferentes no programa.", failText: "Quase. O if não muda o visual; ele decide se um bloco deve executar." },
          ["Comparações", "Comparações como maior que, menor que ou igual a produzem respostas verdadeiras ou falsas.", "Comparar é perguntar: isto é maior? isto é igual? A resposta ajuda o programa a decidir."]
        ]
      },
      briefing_004: {
        title: "Apresentação do bloco 04", subtitle: "Repetição",
        steps: [
          ["Repetir ações", "Programas frequentemente precisam repetir uma ação. Laços evitam copiar a mesma linha várias vezes.", "Quando uma tarefa se repete, um laço ajuda o computador a fazê-la em sequência."],
          ["for", "O for percorre uma sequência. Em cada passagem, trabalha com um item ou número da sequência.", "Pense no for como uma esteira: cada item passa uma vez e o bloco de código executa para ele."],
          { question: "Um laço ajuda principalmente a:", options: ["repetir ações sem copiar código", "desligar o monitor", "mudar o nome do usuário"], successText: "Correto. Laços repetem ações de forma organizada.", failText: "Ainda não. Laços servem para repetir código, não para controlar a interface." },
          ["Indentação", "As linhas indentadas pertencem ao laço. Isso mostra a Python o que deve se repetir.", "Indentação é o espaço no começo da linha. Ela marca o bloco que está dentro do laço."]
        ]
      },
      briefing_005: {
        title: "Apresentação do bloco 05", subtitle: "Listas",
        steps: [
          ["Vários valores", "Uma lista guarda vários valores em ordem. Cada valor é um item.", "Uma lista é como uma prateleira: vários itens ficam juntos, cada um em uma posição."],
          ["Posição", "Os itens de uma lista têm posição. Em Python, a primeira posição normalmente é zero.", "O primeiro item fica na posição 0, o segundo na posição 1 e assim por diante."],
          { question: "Uma lista é usada para:", options: ["guardar vários valores em ordem", "salvar uma senha online", "aumentar o volume do som"], successText: "Correto. Listas organizam vários valores.", failText: "Quase. Uma lista é uma estrutura para guardar vários valores." }
        ]
      },
      briefing_006: {
        title: "Apresentação do bloco 06", subtitle: "Funções",
        steps: [
          ["Código com nome", "Uma função é um bloco de código com um nome. Você o cria uma vez e chama sempre que precisar.", "Uma função é como uma ferramenta: tem um nome e realiza uma tarefa quando você a chama."],
          ["Organização", "Funções ajudam a evitar repetição e deixam o programa mais organizado.", "Quando uma tarefa aparece muitas vezes, colocá-la em uma função deixa tudo mais limpo."],
          { question: "Uma função ajuda você a:", options: ["organizar e reutilizar código", "criar uma nova imagem", "instalar Python sozinha"], successText: "Correto. Funções organizam tarefas reutilizáveis.", failText: "Ainda não. Uma função serve para organizar código sob um nome." }
        ]
      }
    }
  }
};
