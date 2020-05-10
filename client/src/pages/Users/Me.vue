<template>
  <q-page class="row items-center justify-evenly">
    <div class="profile-card js-profile-card">
      <div class="profile-card__img">
        <img :src="user.picture" alt="profile card">
      </div>

      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name">{{ user.firstName }} {{ user.lastName }}</div>
        <div class="profile-card__txt">
          <q-icon name="subject" style="font-size: 2em; margin-right: 5px;" />
          {{ user.bio }}
        </div>
        <div class="profile-card-loc">
          <span class="profile-card-loc__txt">
            <q-icon name="room" style="font-size: 2em; margin-right: 5px;" />
            {{ user.city }}, {{ user.uf }}
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageMe',
  components: {},
  data() {
    return {
      user: null
    }
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("@currentUser"));
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700&subset=latin-ext');


  a, a:hover {
    text-decoration: none;
  }

  .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }

  .wrapper {
    width: 100%;
    width: 100%;
    height: auto;
    min-height: 100vh;
    padding: 50px 20px;
    padding-top: 100px;
    display: flex;
    background-image: linear-gradient(-20deg, #ff2846 0%, #6944ff 100%);

    display: flex;
    background-image: linear-gradient(-20deg, #ff2846 0%, #6944ff 100%);

    @media screen and (max-width: 768px) {
      height: auto;
      min-height: 100vh;
      padding-top: 100px;
    }

  }

  .profile-card {
    width: 100%;
    min-height: 460px;
    margin: auto;
    box-shadow: 0px 8px 60px -10px rgba(13,28,39,0.6);
    background: #fff;
    border-radius: 12px;
    max-width: 700px;
    position: relative;

    &.active {
      .profile-card__cnt {
        filter: blur(6px);
      }

      .profile-card-message,
      .profile-card__overlay {
        opacity: 1;
        pointer-events: auto;
        transition-delay: .1s;
      }

      .profile-card-form {
        transform: none;
        transition-delay: .1s;
      }
    }

    &__img {
      width: 150px;
      height: 150px;
      border-radius: 15px;
      overflow: hidden;
      position: absolute;
      left: 50px;
      top: 50px;
      z-index: 4;
      box-shadow: 0px 5px 50px 0px rgb(68, 102, 252), 0px 0px 0px 7px rgba(74, 174, 255, 0.5);

      @media screen and (max-width: 576px) {
        width: 120px;
        height: 120px;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px;
      }

    }

    &__cnt {
      margin-top: -35px;
      text-align: center;
      padding: 0 20px;
      padding-bottom: 40px;
      transition: all .3s;
    }

    &__name {
      position: absolute;
      top: 50%;
      left: 17.5%;
      transform: translate(-50%, -50%);
      font-weight: 700;
      font-size: 24px;
      color: rgb(0, 0, 0);
    }

    &__txt {
      font-size: 18px;
      font-weight: 500;
      color: #324e63;
      margin-bottom: 15px;

      position: absolute;
      top: 75%;
      left: 13%;
      transform: translate(-50%, -50%);

      strong {
        //color: #ff2846;
        font-weight: 700;
      }

    }

    &-loc {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      font-weight: 400;

      position: absolute;
      top: 65%;
      left: 15%;
      transform: translate(-50%, -50%);
    }

    &-inf {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: flex-start;
      margin-top: 35px;

      &__item {
        padding: 10px 35px;
        min-width: 150px;

        @media screen and (max-width: 768px) {
          padding: 10px 20px;
          min-width: 120px;
        }

      }

      &__title {
        font-weight: 700;
        font-size: 27px;
        //color: #6944ff;
        color: #324e63;
      }

      &__txt {
        font-weight: 500;
        margin-top: 7px;
      }

    }
  }
</style>
