# Bootcamp - Chapter I
# 1 . Configurando ambiente

- O primeiro passo para criar a aplicacao React é inicializar o repositorio criando o package.json, atravez do npm init -y ou yarn init -y.

    O package.json contém todas as informações relevantes do projeto, como nome, versão , variáveis de ambiente, tipo de licença e todas as dependências de terceiros instaladas no projeto.

- Apos isso, vamos instalar as principais dependências que serão usadas no projeto, que sao:

    ```jsx
    yarn add react
    ```

    ```jsx
    yarn add react-dom
    ```

    ```jsx
    yarn add @babel/core @babel/cli @babel/preset-env -D
    ```

    ```jsx
    yarn add webpack webpack-cli webpack-dev-server -D
    ```

    ```jsx
    yarn add node-sass -D
    ```

    - Depois vamos  configurar as dependências que foram instaladas no projeto.
    - **Babel** ⇒ Babel serve para converter todos os códigos para uma versao compativel com o versoes antigas do navegador, por exemplo funções do React ou funcionalidades novas do JavaScript convertidas para uma escrita legível em todos os tipos de ambientes. Configurando:

      Criar um arquivo na raiz do projeto, "babel.config.js" , e configurar o arquivo de preset de acordo com a [documentacao](https://babeljs.io/setup#installation), e 

    Para gerar o arquivo no formato final vamos no terminal e escrevemos o comando : 

    ```jsx
     yarn babel src/index.js --out-file dist/bundle.js
    ```

    Lembrando que neste momento o projeto ja deve conter um index.jsx na pasta src e um index.html na pasta public.

    - **[Webpack](https://webpack.js.org/concepts/)** ⇒ Webpack na sua essencia, é um empacotador estático para apps JavaScript moderno. Quando o Webpack processa o app, ele constrói internamente um gráfico de dependência e mapeia todos os módulos de que o projeto precisa e gera um ou mais pacotes (loaders).
    - Entry ⇒ Um ponto de entrada indica qual modulo Webpack deve usar para começar a construir seu gráfico de dependência interna. Webpack descobrirá de quais outros módulos e bibliotecas esse ponto de entrada depende(direta e indiretamente). Por padrão, seu valor é ./src/index.js , mas voce pode especificar um diferente(ou varios pontos de entrada) definindo uma propriedade de entrada na configuração do webpack. Por exemplo:

        ```jsx
        const path = require('path')

        module.exports = {
        entry: path.resolve(__dirname , 'src' , 'index.jsx'),
        };
        ```

    para passar o diretório do entry, vamos usar o path para evitar problemas com diferentes SOs, 

    - Output ⇒ A propriedade output informa ao Webpack onde emitir os pacotes que ele cria e como nomear esses arquivos. O padrão é ./dist/main.js para o arquivo de saida principal e para a pasta ./dist para qualquer outro arquivo gerado. Voce pode configurar esta parte do processo especificando um campo de saida em sua configuração:

        ```jsx
        output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
        },
        ```

    - Resolve ⇒ A propriedade Resolve recebe as extensões que serão lidas pelo Webpack :

        ```jsx
        resolve: {
        	extensions: ['js' , 'jsx'],
        },
        ```

    - Loaders ⇒ Os loaders permitem que o Webpack processe outros tipos de arquivos e os converta em módulos válidos que podem ser consumidos por seu app e adicionados ao grafico de dependências.  Em um alto nivel, os loaders tem 2 propriedades em suas configurações:

             1 - A prorpiedade test que identifica qual ou quais arquivos devem ser transformados.

        2 - A propriedade use que indica qual loader deve ser usado para fazer a transformacao.

        Propriedade extra: Exclude ⇒ Serve para excluir arquivos que por padrão já estão prontos para irem para o browser, ex: pastas de outras bibliotecas.

    ```jsx
    module: {
    	rules: [
    			{
    				test: /\.jsx$/,
    				exclude: /node_modules/,
    				use: 'babel-loader'.
    			}
    		],
    	}
    };
    ```

    ```jsx
    yarn add babel-loader -D
    ```

    Babel loader é a dependência que irá integrar o Babel com o Webpack.

    - Plugins ⇒ Enquanto os loaders são usados para transformar certos tipos de módulos, os plug-ins podem ser aproveitados para realizar uma ampla gama de tarefas, como otimização de pacote, gerenciamento de ativos e injeção de variáveis de ambiente.

        Para usar um plugin, você precisa de require( ), e adicioná-lo ao array de plugins.A maioria dos plug-ins e personalizável por meio de opcoes. Ja que você pode usar um plugin várias vezes em uma configuração para diferentes propósitos, você precisa criar uma instância dele chamando-o com o new operator.

        ```jsx
        yarn add html-webpack-plugin -D
        const htmlWebpakcPlugin = require('html-webpack-plugin')
        ```

        ```jsx
        plugins: [
        	new htmlWebpackPlugin({
        		template: path.resolve(__dirname, 'public' , 'index.html' )
        	
        ],
        ```

    - Mode ⇒ Ao definir o parâmetro de modo para desenvolvimento, produção ou nenhum, você pode habilitar as otimizações integradas do webpack que corresspondem a cada ambiente. O valor padrão e producao.

        Iremos configurar um ambiente de desenvolvimento e um de produção.

        ```jsx
        const isDevelopment = process.env.NODE_ENV !== 'production'

        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'eval-source-map' : 'source-map',
        ```

        Agora precisamos criar a variavel de ambiente no packet.json e para isso vamos adicionar a dependencia cross-env.

    ```jsx
    yarn add cross-env -D
    ```

    ```jsx
    //package.json

    "scripts": {
    	"dev: "webpack serve"
    	"build": "cross-env NODE_ENV=production webpack"
    },
    ```

    - O ultimo passo de configuracao é configurarmos nossos arquivos CSS, vamos criar uma pasta styles e um arquivo style.css.

    ```jsx
    *{
    	margin: 0;
    	padding: 0;
    	box-sizzing: border-box;
    }

    body{
    	font: Arial, Helvetica, sans-serif;
    }
    ```

    Para poder importar os arquivos CSS no react, vamos ter que adicionar no loader do webpack uma nova rule para esse tipo de arquivo:

    Instalando as dependências:

    ```jsx
    yarn add style-loader css-loader -D
    ```

    ```jsx
    rules: [
    ...
    {
    test: /\.css$/,
    exclude:/node_modules/,
    use: ['style-loader', 'css-loader'],
    ```

    Para finalizar vamos importar o pre-processador de CSS, o SASS.

    Basta fazer todas as importações, e fazer o mesmo procedimento feito para o CSS, e após isso mudar as extensões de CSS para SCSS.

    ```jsx
    yarn add node-sass
    yarn add sass-loader
    ```

    ```jsx
    rules: [
    ...
    {
    test: /\.scss$/,
    exclude:/node_modules/,
    use: ['style-loader', 'css-loader' , 'sass-loader'],
    ```

    Extra : Fast Refresh no Webpack

    - Para continuarmos com o Refresh automatico do Webpack mas sem perder o State das variáveis, precisamos da dependência refresh-webpack-plugin.

    ```jsx
    yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
    ```

    ```jsx
    const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
    ```

    ```jsx
    plugins: [
    	isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    ```

    ```jsx
    devServer: {
    	hot: true,
    },
    ```

    ```jsx
    module:{
    	rules: [
    		{
    			...
    			use:{
    				 loader: 'babel-loader',
    			   options: {
    						plugins: [
    							isDevelopment && require.resolve('react-refresh/babel')
    							].filter(Boolean)
    						}				

    		},

    	],

    }
    ```

# 2 . Conceitos importantes

- React eh uma biblioteca JavaScript para construção de interfaces, seus 3 principais conceitos são:
    - Componentes
    - Propriedades
    - Estado

- Components ⇒ Os components no React deixam você dividir  em pedacos independentes, reusaveis e pensar de forma isolada em cada peça que compõe a interface. Cada component é uma Class ou Function JavaScript (conceitualmente), elas aceitam inputs(chamados "props") e retornam elementos que descrevem o que deve aparecer na tela.

- Propriedades ⇒ As propriedades de um component React são os inputs dados a ele, que são compartilhados entre pai e filho, atravéz do atributo props.

- Estado ⇒ Estado é similar a propriedade, mas é privado e totalmente controlado pelo component. O uso mais comum é quando queremos mudar o valor de uma variavel e exibir em tela, mas como o React nao fica re-renderizando a tela sempre que algo muda de valor, precisamos de um "hook" que faca essa chamada de renderização na mudança de valor, e para isso usamos o useState :

    ```jsx
    import { useState } from 'react'

    export function Counter(){
        const [counter , setCounter] = useState(0);
        
        function increment(){
            setCounter(counter + 1);
        }
        
        return(
            <div>
                <h2>{counter}</h2>
                <button 
                    type="button"
                    onClick={increment}
                >Increment</button>
            </div>
        );
    }
    ```

Exemplo de Função de um contador usando useState para atualizar a tela. O useState() retorna 2 valores, o valor inicial (counter = 0 ) e uma função que atualiza o valor.