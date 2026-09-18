<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz: IA e o Futuro na Escola</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .card {
            background-color: #1e293b;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 550px;
            width: 100%;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        h1 {
            font-size: 1.4rem;
            color: #38bdf8;
            margin-top: 0;
            text-align: center;
        }

        .pergunta-box {
            background-color: #334155;
            padding: 1.2rem;
            border-radius: 0.5rem;
            font-size: 1.05rem;
            margin-bottom: 1.5rem;
            line-height: 1.4;
        }

        .opcoes-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 1.5rem;
        }

        .btn-opcao {
            background-color: #475569;
            color: #fff;
            border: 2px solid transparent;
            padding: 12px;
            border-radius: 0.5rem;
            cursor: pointer;
            text-align: left;
            font-size: 0.95rem;
            transition: all 0.2s;
        }

        .btn-opcao:hover {
            background-color: #64748b;
        }

        .btn-proxima {
            background-color: #10b981;
            color: #0f172a;
            font-weight: bold;
            border: none;
            padding: 12px 20px;
            border-radius: 0.5rem;
            cursor: pointer;
            width: 100%;
            font-size: 1rem;
        }

        .btn-proxima:hover {
            background-color: #34d399;
        }

        .feedback {
            margin-top: 1rem;
            padding: 10px;
            border-radius: 0.5rem;
            display: none;
            font-size: 0.95rem;
        }

        .sucesso { background-color: #065f46; color: #a7f3d0; }
        .erro { background-color: #991b1b; color: #fecaca; }

        .inspecao {
            margin-top: 1.5rem;
            font-size: 0.8rem;
            color: #94a3b8;
            background-color: #0f172a;
            padding: 10px;
            border-radius: 0.5rem;
        }
    </style>
</head>
<body>

    <div class="card">
        <h1>Perguntas e Reflexões sobre IA 🤖</h1>
        
        <div id="pergunta-texto" class="pergunta-box">Carregando pergunta...</div>

        <div id="opcoes" class="opcoes-container"></div>

        <button id="btn-proxima" class="btn-proxima">Próxima Pergunta</button>

        <div id="feedback" class="feedback"></div>

        <div class="inspecao">
            <p><strong>Inspeção do Sistema (Conceitos da Aula):</strong></p>
            <p>• Padrão substituído (.replace): <span id="log-replace">-</span></p>
            <p>• Verificação da resposta no for...of: <span id="log-loop">-</span></p>
        </div>
    </div>

    <script>
        // Banco de perguntas e reflexões
        const bancoPerguntas = [
            {
                pergunta: "Qual deve ser o papel principal da Inteligência Artificial no ambiente [LOCAL]?",
                opcoes: [
                    "Substituir completamente o papel dos professores.",
                    "Servir como ferramenta de apoio ao aprendizado e pesquisa.",
                    "Apenas automatizar notas de provas sem reflexão."
                ],
                correta: 1,
                reflexao: "A IA é mais eficiente quando usada para expandir o conhecimento humano, nunca para substituir o senso crítico."
            },
            {
                pergunta: "Como alunos e professores devem encarar dados gerados por IA no contexto [LOCAL]?",
                opcoes: [
                    "Aceitar tudo como verdade absoluta.",
                    "Analisar com senso crítico e verificar fontes confiáveis.",
                    "Evitar totalmente o uso de qualquer tecnologia."
                ],
                correta: 1,
                reflexao: "A reflexão crítica é indispensável para combater alucinações e desinformação trazidas por algoritmos."
            },
            {
                pergunta: "Ao utilizar IA para realizar trabalhos no ambiente [LOCAL], qual o principal cuidado ético?",
                opcoes: [
                    "Usar a IA para criar o pensamento próprio em vez de copiar textos.",
                    "Copiar e colar o conteúdo sem citar referências.",
                    "Pedir para a IA resolver conflitos pessoais em sala."
                ],
                correta: 0,
                reflexao: "A ética no uso da IA envolve transparência e autoria real sobre o conhecimento produzido."
            }
        ];

        // Elementos do DOM
        const perguntaTexto = document.getElementById('pergunta-texto');
        const opcoesContainer = document.getElementById('opcoes');
        const btnProxima = document.getElementById('btn-proxima');
        const feedbackBox = document.getElementById('feedback');
        const logReplace = document.getElementById('log-replace');
        const logLoop = document.getElementById('log-loop');

        let perguntaAtual = null;

        // 1. Função com Algoritmo de Aleatoriedade
        function sortearPergunta() {
            const indice = Math.floor(Math.random() * bancoPerguntas.length);
            return bancoPerguntas[indice];
        }

        // 2. Carregar e Processar a Pergunta
        function carregarPergunta() {
            feedbackBox.style.display = 'none';
            opcoesContainer.innerHTML = '';
            
            perguntaAtual = sortearPergunta();

            // Uso do método .replace() e condicionais
            let textoFormatado = perguntaAtual.pergunta;
            if (textoFormatado.includes("[LOCAL]")) {
                textoFormatado = textoFormatado.replace("[LOCAL]", "ESCOLAR");
                logReplace.textContent = 'Substituiu "[LOCAL]" por "ESCOLAR"';
            }

            perguntaTexto.textContent = textoFormatado;

            // Renderizar as opções
            perguntaAtual.opcoes.forEach((opcao, index) => {
                const botao = document.createElement('button');
                botao.className = 'btn-opcao';
                botao.textContent = `${index + 1}. ${opcao}`;
                botao.onclick = () => verificarResposta(index);
                opcoesContainer.appendChild(botao);
            });
        }

        // 3. Verificar resposta usando for...of com break
        function verificarResposta(indiceSelecionado) {
            let encontrouCorreta = false;
            let posicaoLoop = 0;

            // Laço for...of percorrendo as opções com condição de parada (break)
            for (const [index, opcao] of perguntaAtual.opcoes.entries()) {
                posicaoLoop++;
                if (index === perguntaAtual.correta) {
                    encontrouCorreta = true;
                    logLoop.textContent = `Encontrou a alternativa certa na iteração ${posicaoLoop}`;
                    break; // Parada do laço
                }
            }

            // Condicional de validação de resposta do usuário
            feedbackBox.style.display = 'block';
            if (indiceSelecionado === perguntaAtual.correta) {
                feedbackBox.className = 'feedback sucesso';
                feedbackBox.innerHTML = `<strong>Correto!</strong><br>${perguntaAtual.reflexao}`;
            } else {
                feedbackBox.className = 'feedback erro';
                feedbackBox.innerHTML = `<strong>Ops, incorreto!</strong><br>${perguntaAtual.reflexao}`;
            }
        }

        // Listener para trocar de pergunta
        btnProxima.addEventListener('click', carregarPergunta);

        // Inicializa o quiz
        carregarPergunta();
    </script>
</body>
</html>
