"use strict";

// Pedagogical depth layer. The base lesson files define the progression and
// interactions; this module adds explicit definitions, mental models, common
// mistakes and explanatory feedback before the catalog is exported to Python.
(() => {
  const sources = [
    window.MOMPY_CLASSROOM_LESSONS,
    window.MOMPY_CLASSROOM_LESSONS_DRAFT_2_4,
    window.MOMPY_CLASSROOM_LESSONS_DRAFT_5_8,
  ];

  function getLesson(lessonId, locale = "pt-BR") {
    for (const source of sources) {
      const lesson = source?.[lessonId]?.[locale];
      if (lesson) return lesson;
    }
    return null;
  }

  function patchSteps(lessonId, patches, locale = "pt-BR") {
    const lesson = getLesson(lessonId, locale);
    if (!lesson?.steps) return;
    const steps = new Map(lesson.steps.map((step) => [step.id, step]));
    Object.entries(patches).forEach(([stepId, patch]) => {
      const step = steps.get(stepId);
      if (step) Object.assign(step, patch);
    });
  }

  patchSteps("briefing_001", {
    "what-is-python": {
      definition: "Linguagem de programação é um conjunto de palavras e regras usado para escrever instruções que uma máquina consegue interpretar sem adivinhar.",
      mentalModel: "Pense no código como uma descrição precisa: cada parte registra um passo que a máquina deverá realizar.",
    },
    instruction: {
      definition: "Instrução é uma unidade de ação escrita de acordo com as regras da linguagem.",
      mentalModel: "Siga o caminho sem misturar as etapas: primeiro existe código; o intérprete conduz a execução; a saída aparece como consequência.",
    },
    "first-print": {
      mentalModel: "Leia print(\"Olá, Mompy!\") como: chame a ação print e entregue a ela o texto Olá, Mompy!.",
    },
    "print-anatomy": {
      body: [
        "Leia a chamada de fora para dentro: print é o nome da função; os parênteses abrem e fecham a chamada; dentro deles está a string entregue à função.",
        "As aspas abrem e fecham o texto. Aspas e parênteses são pares independentes e não aparecem na saída.",
      ],
      definition: "Uma chamada de função tem a forma nome(argumentos). Aqui, a função é print e o argumento é a string \"Olá, Mompy!\".",
      warning: "Abrir aspas ou parênteses cria um par que precisa ser fechado. Se um dos símbolos faltar, Python não consegue determinar onde o texto ou a chamada termina.",
    },
    "mastery-python": { success: "Correto. Python é uma linguagem: ela fornece palavras e regras para expressar instruções executáveis." },
    "mastery-print": { success: "Correto. print recebe uma informação e a exibe como saída; ele não guarda nem transforma o valor automaticamente." },
    "mastery-text": { success: "Correto. \"Oi\" é a string: as aspas delimitam exatamente onde o texto começa e termina." },
    "mastery-order": { success: "Correto. Python executa a primeira chamada de print e depois a segunda, produzindo A e B em linhas separadas." },
    "mastery-syntax": { success: "Verificação concluída. A chamada completa combina print, parênteses e uma string com as duas aspas fechadas." },
  });

  patchSteps("briefing_002", {
    "var-purpose-demo": {
      definition: "Variável é um nome que aponta para um valor durante a execução do programa.",
      mentalModel: "Imagine uma etiqueta reutilizável: nome é a etiqueta; \"Lia\" é o valor encontrado quando o programa consulta essa etiqueta.",
      warning: "A variável não é o texto do seu nome. print(nome) consulta o valor; print(\"nome\") mostra literalmente a palavra nome.",
    },
    "var-assignment": {
      mentalModel: "Leia nome = \"Lia\" da direita para a esquerda: produza o valor \"Lia\" e associe esse valor ao nome nome.",
      warning: "Em uma atribuição, = significa recebe. Para perguntar se dois valores são iguais, Python usa ==.",
    },
    "var-value-types": {
      definition: "O tipo descreve a natureza do valor e determina quais operações fazem sentido para ele.",
      note: "10 é inteiro; 2.5 é decimal; \"10\" é texto; True e False são booleanos. Valores visualmente parecidos podem ter comportamentos diferentes.",
    },
    "var-update-demo": {
      mentalModel: "Em energia = energia + 2, o nome à direita é consultado primeiro. Só depois do cálculo o novo resultado substitui o valor anterior.",
    },
    "var-name-rules": {
      warning: "Nomes são exatos e diferenciam maiúsculas de minúsculas. energia, Energia e ENERGIA são três variáveis diferentes.",
    },
    "var-error-undefined-teach": {
      mentalModel: "Antes de usar um nome, Python precisa ter encontrado uma atribuição executada para esse mesmo nome.",
      warning: "Um erro de nome geralmente indica três possibilidades: variável usada cedo demais, grafia diferente ou letras maiúsculas/minúsculas trocadas.",
    },
    "var-mastery-purpose": { success: "Correto. Uma variável permite nomear um valor para consultá-lo e atualizá-lo em outras instruções." },
    "var-mastery-assignment": { success: "Correto. vidas = 3 associa o valor inteiro 3 ao nome vidas." },
    "var-mastery-type": { success: "Correto. Sem aspas, 10 é um número inteiro e pode participar de cálculos numéricos." },
    "var-mastery-state": { success: "Correto. Cada atribuição altera o estado; a última atribuição determina o valor exibido." },
    "var-mastery-name": { success: "Correto. O mesmo nome precisa ser usado na atribuição e na consulta; uma letra diferente aponta para outra variável." },
  });

  patchSteps("briefing_003", {
    "decision-condition-concept": {
      definition: "Condição é uma expressão cujo resultado é um booleano: True ou False.",
      mentalModel: "Uma condição funciona como a pergunta de uma cancela. A resposta não é uma opinião: naquele instante, a expressão é verdadeira ou falsa.",
    },
    "decision-comparisons": {
      warning: "Não confunda = com ==. O primeiro atribui um valor; o segundo compara dois valores e produz True ou False.",
    },
    "decision-if-demo": {
      mentalModel: "if avalia a condição uma vez. Se o resultado for True, entra no bloco indentado; se for False, pula esse bloco.",
      warning: "Os dois-pontos abrem o bloco e a indentação mostra sua extensão. Em Python, o recuo faz parte da sintaxe.",
    },
    "decision-else-demo": {
      definition: "else representa o caminho alternativo do mesmo teste e só é escolhido quando a condição de if é False.",
      warning: "Em uma estrutura if/else simples, apenas um bloco executa. else não é uma segunda decisão independente.",
    },
    "decision-errors-teach": {
      mentalModel: "Ao reparar uma decisão, confira em ordem: operador da condição, dois-pontos e indentação do bloco.",
    },
    "decision-mastery-condition": { success: "Correto. Toda condição precisa produzir True ou False para que o programa possa escolher um caminho." },
    "decision-mastery-operator": { success: "Correto. != pergunta se os valores são diferentes e devolve um booleano." },
    "decision-mastery-if": { success: "Correto. O bloco de if executa somente quando sua condição resulta em True." },
    "decision-mastery-else": { success: "Correto. else executa o caminho alternativo quando a condição do if resulta em False." },
    "decision-mastery-output": { success: "Correto. Primeiro avalie a condição; depois leia apenas o bloco correspondente ao resultado." },
  });

  patchSteps("briefing_004", {
    "for-purpose": {
      definition: "for é um laço que percorre uma sequência e executa o mesmo bloco para cada elemento.",
      mentalModel: "Em vez de copiar a mesma instrução várias vezes, você descreve a ação uma vez e deixa a sequência fornecer os valores de cada passagem.",
    },
    "for-anatomy": {
      mentalModel: "Leia for item in itens como: para cada valor existente em itens, coloque esse valor temporariamente em item e execute o bloco.",
    },
    "for-range-demo": {
      warning: "O limite final de range não entra na sequência. range(3) gera 0, 1 e 2 — três valores, mas nunca o 3.",
    },
    "for-range-start-demo": {
      mentalModel: "Em range(início, limite), o primeiro número entra e o limite fica de fora. range(1, 4) produz 1, 2 e 3.",
    },
    "for-indentation": {
      warning: "Uma linha alinhada com for está fora do laço e executa apenas depois que todas as passagens terminam.",
    },
    "for-accumulator-demo": {
      definition: "Acumulador é uma variável atualizada a cada passagem para reunir um resultado, como soma, contagem ou total.",
      mentalModel: "Cada passagem lê o total atual, combina o próximo valor e guarda o novo total para a passagem seguinte.",
    },
    "for-mastery-purpose": { success: "Correto. for é adequado quando queremos percorrer valores de uma sequência sem duplicar o bloco." },
    "for-mastery-variable": { success: "Correto. A variável do laço recebe um elemento diferente da sequência em cada passagem." },
    "for-mastery-range": { success: "Correto. range(5) produz cinco valores, de 0 até 4; o limite 5 não entra." },
    "for-mastery-indent": { success: "Correto. Somente a linha indentada pertence ao bloco e se repete em cada passagem." },
    "for-mastery-output": { success: "Correto. Trace uma passagem por vez, atualizando a variável do laço antes de executar o bloco." },
  });

  patchSteps("briefing_005", {
    "lists-opening": {
      definition: "Lista é uma coleção ordenada e mutável: ela guarda vários valores, preserva posições e pode ser alterada.",
      mentalModel: "Pense em uma fileira de compartimentos numerados. A lista é a fileira; cada índice identifica a posição de um item.",
    },
    "lists-concept-demo": {
      warning: "Os índices começam em zero. Em uma lista com três itens, as posições válidas são 0, 1 e 2.",
    },
    "lists-anatomy": {
      body: [
        "Os colchetes delimitam a coleção, as vírgulas separam os itens e cada item mantém seu próprio tipo.",
        "A ordem faz parte da lista: trocar dois itens muda o valor encontrado em cada índice.",
      ],
      mentalModel: "O índice é uma posição, não a quantidade do item. O primeiro ocupa 0; o segundo ocupa 1.",
    },
    "lists-toolbox": {
      warning: "Ler lista[indice] não modifica a coleção. append modifica a própria lista ao acrescentar um valor no final.",
    },
    "lists-guided-append": {
      mentalModel: "append altera a lista existente; ele não substitui os itens que já estavam nela.",
    },
    "lists-mastery-create": { success: "Correto. Colchetes criam a lista, vírgulas separam os itens e aspas delimitam cada texto." },
    "lists-mastery-second": { success: "Correto. Como a contagem começa em zero, o segundo item é acessado pelo índice 1." },
    "lists-mastery-length": { success: "Correto. len devolve a quantidade de elementos; nessa lista existem três." },
    "lists-mastery-append": { success: "Correto. append acrescenta um elemento ao final e modifica a lista existente." },
    "lists-mastery-loop": { success: "Correto. Dentro do for, item recebe um elemento diferente da lista em cada passagem." },
  });

  patchSteps("briefing_006", {
    "functions-opening": {
      definition: "Função é um bloco de código nomeado que pode receber valores, realizar uma tarefa e devolver um resultado.",
      mentalModel: "Uma função funciona como uma pequena máquina: argumentos entram, o bloco processa e return pode entregar um valor de volta.",
    },
    "functions-concept-demo": {
      warning: "Definir uma função apenas registra a regra. O bloco só executa quando ocorre uma chamada, como dobro(4).",
    },
    "functions-anatomy": {
      body: [
        "def inicia a definição; o nome identifica a função; os parâmetros recebem os argumentos enviados pela chamada.",
        "O bloco indentado pertence à função. return encerra a execução daquela chamada e envia um valor de volta.",
      ],
      mentalModel: "Na chamada dobro(4), o argumento 4 entra no parâmetro numero; o bloco calcula 8; return entrega 8 a print.",
    },
    "functions-toolbox": {
      warning: "print e return não são equivalentes. print mostra uma informação; return disponibiliza um valor para outra parte do programa.",
    },
    "functions-mastery-definition": { success: "Correto. Uma definição válida usa def, nome, parênteses e dois-pontos antes do bloco indentado." },
    "functions-mastery-parameter": { success: "Correto. nome é o parâmetro que receberá o argumento enviado em cada chamada." },
    "functions-mastery-call": { success: "Correto. soma(2, 3) chama a função e envia dois argumentos; def só é usado na definição." },
    "functions-mastery-return": { success: "Correto. return devolve um valor para o ponto da chamada; print apenas o torna visível na saída." },
    "functions-mastery-output": { success: "Correto. Resolva cada chamada separadamente e use o valor devolvido onde a chamada aparece." },
  });

  patchSteps("briefing_007", {
    "dicts-opening": {
      definition: "Dicionário é uma coleção mutável de pares chave: valor. As chaves identificam o significado dos valores.",
      mentalModel: "Em vez de procurar pela posição 0 ou 1, você consulta uma etiqueta como \"nome\" ou \"energia\".",
    },
    "dicts-concept-demo": {
      warning: "A chave precisa corresponder exatamente. \"nome\" e \"Nome\" são chaves diferentes.",
    },
    "dicts-anatomy": {
      body: [
        "As chaves devem ser únicas dentro do dicionário. Cada dois-pontos liga uma chave ao seu valor; vírgulas separam os pares.",
        "Consultar dados[\"nome\"] procura pela chave, não pelo conteúdo nem pela posição do par.",
      ],
      mentalModel: "Leia \"nome\": \"Lia\" como: a chave nome aponta para o valor Lia.",
    },
    "dicts-roles": {
      warning: "Acesso direto com dados[chave] falha se a chave não existir. get é mais seguro quando a ausência é possível e você possui um valor padrão.",
    },
    "dicts-update-demo": {
      mentalModel: "Atribuir a uma chave existente atualiza seu valor; atribuir a uma chave nova acrescenta outro par ao mesmo dicionário.",
    },
    "dicts-mastery-create": { success: "Correto. Chaves e valores formam pares dentro de chaves { }, ligados por dois-pontos." },
    "dicts-mastery-access": { success: "Correto. pessoa[\"idade\"] consulta o valor associado exatamente à chave idade." },
    "dicts-mastery-update": { success: "Correto. Atribuir 20 à chave pontos substitui o valor anterior dessa chave." },
    "dicts-mastery-get": { success: "Correto. get usa o valor padrão quando a chave procurada não existe, sem interromper o programa." },
    "dicts-mastery-items": { success: "Correto. items() fornece cada chave junto do seu valor para que o for possa desempacotar o par." },
  });

  patchSteps("briefing_008", {
    "while-opening": {
      definition: "while é um laço condicional: ele repete o bloco enquanto uma condição continuar resultando em True.",
      mentalModel: "O laço não recebe antecipadamente um número de voltas. Antes de cada passagem, ele pergunta se ainda deve continuar.",
    },
    "while-concept-demo": {
      warning: "A condição é testada antes do bloco. Se começar False, o bloco pode não executar nenhuma vez.",
    },
    "while-anatomy": {
      body: [
        "Um while controlado precisa de estado inicial, condição, trabalho e atualização do estado.",
        "Depois da atualização, o fluxo retorna à condição. O laço termina quando ela se torna False.",
      ],
      mentalModel: "Trace o valor usado na condição a cada volta. Essa tabela mental revela tanto a saída quanto o momento de parada.",
    },
    "while-toolbox": {
      warning: "Use for para percorrer uma sequência conhecida. Use while quando a continuidade depende de uma condição que muda durante a execução.",
    },
    "while-safety": {
      mentalModel: "Para provar que o laço termina, identifique qual valor muda e por que essa mudança aproxima a condição de False.",
      warning: "Se o estado nunca mudar, ou mudar na direção errada, a condição pode permanecer True para sempre e criar um laço infinito.",
    },
    "while-mastery-purpose": { success: "Correto. while é ideal quando a repetição depende de uma condição e o número de voltas não é conhecido antecipadamente." },
    "while-mastery-test": { success: "Correto. A condição é avaliada antes de cada passagem, inclusive antes da primeira." },
    "while-mastery-output": { success: "Correto. Para prever a saída, acompanhe o estado, teste a condição e execute uma volta por vez." },
    "while-mastery-update": { success: "Correto. A atualização precisa aproximar o estado do ponto em que a condição se torna False." },
    "while-mastery-indent": { success: "Correto. A linha sem indentação está fora do bloco e só executa depois que o laço termina." },
  });
})();
