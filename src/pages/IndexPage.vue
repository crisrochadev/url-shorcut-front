<template>
  <q-page class="">
    <div class="">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="450px"
        class="bg-blue-5 text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="add_link" size="56px" />
          <div class="q-mt-md text-center text-lg">
            Encurte seus links longos de forma rápida e fácil. URL SHORTCUT de
            links, você pode transformar URLs complexas em algo curto e
            compartilhável.
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="update" size="56px" />
          <div class="q-mt-md text-center text-lg">
            Com o URL SHORTCUT, seus URLs serão válidos por 7 dias,
            proporcionando flexibilidade e controle. Você pode ativar novamente,
            desabilitar e habilitar seus links conforme necessário.
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="security" size="56px" />
          <div class="q-mt-md text-center text-lg">
            Compartilhe seus links com confiança! O URL SHORTCUT oferece uma
            solução segura, permitindo que você proteja seus URLs e mantenha o
            controle sobre eles. Com a opção de expiração em 7 dias, você nunca
            mais terá links desatualizados circulando pela web.
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="control_point" size="56px" />
          <div class="q-mt-md text-center text-lg">
            Transforme seus links em algo curto e poderoso! O URL-SHORTCUT de
            links oferece uma maneira simples de compartilhar conteúdo online.
            Com a opção de ativar, desabilitar e habilitar novamente, você tem
            total controle sobre seus links.
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="w-11/12 mx-auto flex justify-center flex-col items-center mb-8">
      <h2
        class="uppercase text-blue-5 text-center text-2xl font-extrabold my-8"
      >
        Considerações inportantes!
      </h2>
      <p class="text-center text-grey-800 text-lg">
        Gostaria de compartilhar com você que este encurtador de links é um
        projeto pessoal desenvolvido por mim, com o objetivo de demonstrar
        minhas habilidades como programadora. Entendo a importância de encurtar
        links longos, oferecer opções de expiração e proporcionar controle sobre
        eles. Por isso, criei essa ferramenta com funcionalidades básicas para
        exemplificar minhas capacidades técnicas. É importante observar que este
        encurtador de links é um projeto em fase de demonstração e não tenho a
        intenção de fornecer serviços comerciais de encurtamento de links.
        Portanto, sua disponibilidade e desempenho podem ser limitados. Agradeço
        sinceramente pelo seu interesse e apoio. Se tiver alguma dúvida ou
        quiser saber mais sobre meu trabalho como programadora, fique à vontade
        para entrar em contato comigo.
      </p>
      <div class="w-full flex justify-center items-center gap-4 my-4">
        <a
          href="https://linkedin.com/in/crisrochadev"
          target="__blabk"
          class="flex justify-center items-center gap-2 text-blue-7 text-lg"
        >
          <q-icon name="fab fa-linkedin" />
          <span>Linkedin</span>
        </a>
        <a
          href="https://github.com/crisrochadev"
          target="__blabk"
          class="flex justify-center items-center gap-2 text-grey-7 text-lg"
        >
          <q-icon name="fab fa-github" />
          <span>GitHub</span>
        </a>
      </div>
      <div class="flex justify-center items-center gap-4 shadow-md p-2 rounded">
        <q-avatar>
          <img
            src="https://github.com/crisrochadev.png"
            alt="Cris Rocha"
            title="Cris Rocha"
          />
        </q-avatar>
        <div>
          <h3 class="p-0 m-0 uppercase text-blue-5 font-bold text-lg">
            Cris Rocha
          </h3>
          <p class="text-md text-grey-700">Desenvolvedora FullStack</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import useScreenView from "src/composables/useScreenView";

const slide = ref("style");
</script>
