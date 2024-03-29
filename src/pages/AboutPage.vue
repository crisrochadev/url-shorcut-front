<template>
  <q-page class="flex justify-center items-center">
    <q-card class="px-8 w-[90%] my-4">
      <q-card-section header>
        <h1 class="text-center uppercase text-blue-500 text-lg font-bold">
          Documentação do projeto - Url Shorcut
        </h1>
      </q-card-section>
      <h2 class="uppercase text-lg text-blue-500">
        <q-icon name="store" class="mr-4" />
        <span>Front-End</span>
      </h2>
      <hr />
      <p
        class="w-11/12 mx-auto my-4 p-2 bg-blue-100 rounded shadow-md text-grey-800"
      >
        O front-end do projeto foi desenvolvido utilizando Vue 3 e Quasar. Foram
        utilizadas as seguintes bibliotecas: Tailwind CSS, Pinia e Axios.
      </p>

      <h3 class="text-grey-800 uppercase">
        <q-icon name="keyboard_command_key" class="mr-4" />
        <span>Comandos</span>
      </h3>
      <pre
        class="bg-gray-800 text-white pt-1 w-[300px] rounded shadow-md h-8 mb-2"
      >
        quasar dev
      </pre>
      <pre
        class="bg-gray-800 text-white pt-1 w-[300px] rounded shadow-md h-8 mb-2"
      >
        quasar build
      </pre>
      <hr />

      <h3 class="text-grey-800 uppercase">
        <q-icon name="auto_stories" class="mr-4" />
        <span>Páginas</span>
      </h3>
      <hr />
      <ul class="my-4">
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Início -
          <code class="ml-1">/</code>
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Criar um novo link -
          <code class="ml-1">/new</code>
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Listagem dos links -
          <code class="ml-1">/links</code>
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Documentação -
          <code class="ml-1">/about</code>
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Redirecionamento -
          <code class="ml-1">/:slug</code>
        </li>
      </ul>

      <h2 class="uppercase text-grey-800">
        <q-icon name="code" class="mr-4" />
        <span>Tecnologias Utilizadas</span>
      </h2>
      <hr />
      <q-markup-table class="w-[300px] my-4">
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Tecnologia</th>
              <th class="text-left">Versão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Node</td>
              <td>18.15.0</td>
            </tr>
            <tr>
              <td>Vue</td>
              <td>3.0.0</td>
            </tr>
            <tr>
              <td>Quasar</td>
              <td>2.6.0</td>
            </tr>
            <tr>
              <td>Tailwind CSS</td>
              <td>2.0.0</td>
            </tr>
            <tr>
              <td>Pinia</td>
              <td>2.0.11</td>
            </tr>
            <tr>
              <td>Axios</td>
              <td>1.2.1</td>
            </tr>
            <tr>
              <td>Vue Router</td>
              <td>4.0.0</td>
            </tr>
          </tbody>
        </table>
      </q-markup-table>
      <h2 class="uppercase text-lg text-blue-500">
        <q-icon name="settings_suggest" class="mr-4" />
        <span>Back-End</span>
      </h2>
      <hr />
      <p
        class="w-11/12 mx-auto my-4 p-2 bg-blue-100 rounded shadow-md text-grey-800"
      >
        O back-end do projeto foi desenvolvido utilizando Laravel. A biblioteca
        Hashids foi utilizada para criar os slugs encurtados dos links. O
        projeto foi dividido em controllers, repositories e models.
      </p>

      <h3 class="text-grey-800 uppercase">
        <q-icon name="fas fa-meteor" class="mr-4" />
        <span>Funcionalidades</span>
      </h3>
      <hr />
      <ul class="my-4">
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Criar um link com data de expiração de 7 dias
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Listar os links não desativados
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Listar os links ativados
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Reativar um link expirado
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          Buscar um link pelo slug (retorna apenas links ativos e não expirados)
        </li>
      </ul>

      <h3 class="text-grey-800 uppercase">
        <q-icon name="fas fa-database" class="mr-4" />
        <span>Banco de Dados</span>
      </h3>
      <hr />
      <p class="my-4">
        O projeto utiliza um banco de dados MySQL com uma tabela que possui as
        seguintes colunas:
      </p>
      <ul class="my-4">
        <li
          class="flex justify-start items-center before:content-['♦'] before:mr-2"
        >
          <code class="ml-1">id</code> - ID do link (auto incremento)
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          <code class="ml-1">url</code> - URL do link (string)
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          <code class="ml-1">slug</code> - Slug encurtado do link (string)
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          <code class="ml-1">expired_date</code> - Data de expiração do link
          (datetime)
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          <code class="ml-1">deleted_at</code> - Data de exclusão (soft delete
          do Laravel)
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          <code class="ml-1">updated_at</code> - Data de atualização (automática
          pelo Laravel)
        </li>
        <li
          class="flex justify-start items-center before:content-['♦'] before:inline-block before:mr-2"
        >
          <code class="ml-1">created_at</code> - Data de criação (automática
          pelo Laravel)
        </li>
      </ul>
      <h2 class="uppercase text-grey-800">
        <q-icon name="code" class="mr-4" />
        <span>Tecnologias Utilizadas</span>
      </h2>
      <hr />
      <q-markup-table class="w-[300px] my-4">
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Tecnologia</th>
              <th class="text-left">Versão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Laravel</td>
              <td>10.8.0</td>
            </tr>
            <tr>
              <td>PHP</td>
              <td>8.1.10</td>
            </tr>
          </tbody>
        </table>
      </q-markup-table>
    </q-card>
  </q-page>
</template>
<script setup></script>
<style lang=""></style>
