# Obra Certa - Gestão de Obras e Reformas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.10-brightgreen.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue.svg)
![Docker](https://img.shields.io/badge/Docker-ready-blue.svg)

O **ObraCerta** consiste em uma plataforma digital Full Stack desenvolvida para otimizar o processo de medição e gerenciamento de obras na construção civil. A ferramenta foi criada para ser uma solução centralizada que aumenta a eficiência, reduz desperdícios e facilita o controle de custos, tornando a gestão de projetos mais simples e precisa.

## 👥 Equipe Desenvolvedora
* [Gabriel Oldrado Alecrim Silva Machado](https://github.com/gabriel-oldrado)
* [Kaique Henrique da Silva Félix dos Santos](https://github.com/KaiqueH97)
* [Leonado Mendonça](https://github.com/Leofront-end)

## 📑 Sumário
- [Objetivos e Impacto](#-objetivos-e-impacto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Como Instalar e Executar](#-como-instalar-e-executar)
- [Licença](#-licença)

## 🎯 Objetivos e Impacto
* **Simplificar e organizar** o registro de medições da obra, como pisos e paredes.
* **Reduzir desperdícios** de materiais através de cálculos precisos e um planejamento otimizado.
* **Otimizar o planejamento financeiro** e a execução dos projetos de construção.
* **Acessibilidade:** Interface projetada para ser inclusiva e fácil de usar.
* **Impacto Sustentável (ODS 12):** Promover práticas de consumo e produção mais sustentáveis no setor.

## ✨ Funcionalidades

### 🖥️ Frontend (Interface do Usuário)
* **📐 Registro de Medidas:** Permite a inserção de medidas com o sistema realizando cálculos automáticos de áreas e volumes.
* **📸 Documentação Fotográfica:** Funcionalidade para anexar fotos às medições, criando um registro visual do progresso da obra.
* **💰 Orçamento e Materiais:** Ferramentas integradas para planejamento orçamentário e cálculo da quantidade de materiais necessários.
* **♿ Acessibilidade Integrada:** Fontes ampliadas e navegação intuitiva para usuários com pouca experiência técnica.

### ⚙️ Backend (API RESTful e Lógica de Negócios)
* **🔐 Autenticação e Segurança:** Login baseado em sessão criptografada utilizando Spring Security e BCrypt. Políticas de CORS e CSP ativadas.
* **👥 Gerenciamento de Usuários (CRUD):** Criação, listagem, atualização e exclusão de contas de usuários com validação de dados.
* **☁️ Armazenamento Seguro:** Banco de dados relacional que garante o salvamento seguro e de fácil acesso às informações do projeto.
* **🐳 Dockerizado:** Imagem otimizada com multi-stage build via Alpine Linux.

## 🛠 Tecnologias Utilizadas

**Frontend:**
* HTML5, CSS3, JavaScript (Vanilla)

**Backend:**
* **Linguagem:** Java 21
* **Framework Principal:** Spring Boot 3.5.10
* **Segurança:** Spring Security
* **Persistência de Dados:** Spring Data JPA
* **Bancos de Dados:** PostgreSQL (Produção) / H2 Database (Testes e Desenvolvimento)
* **Gerenciador de Dependências:** Maven
* **Variáveis de Ambiente:** Spring Dotenv (`me.paulschwarz`)
* **Infraestrutura:** Docker

## Telas

<table>
  <tr>
    <td align="center">
      <img src="/assets/images/calc.png" alt="Tela da Calculadora" width="600"><br>
      <sup>Tela de Inserção de Dados</sup>
    </td>
    <td align="center">
      <img src="/assets/images/result.png" alt="Resultado da Calculadora" width="400"><br>
      <sup>Resultado do Cálculo</sup>
    </td>
  </tr>
</table>



## ⚙️ Pré-requisitos
Certifique-se de possuir em seu ambiente:
- Navegador Web atualizado (com extensão Live Server para o Front)
- Java JDK 21+
- Apache Maven 3.8+
- Docker e Docker Compose (Opcional, para conteinerização)
