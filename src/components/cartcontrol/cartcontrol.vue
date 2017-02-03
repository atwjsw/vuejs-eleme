<template>
  <div class="cartcontrol">
  <span class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
  </span>
  <span class="cart-count" v-show="food.count>0">{{food.count}}</span>
  <span class="cart-increase icon-add_circle" @click.stop.prevent="addCart">
  </span>   
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
    }
    if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
      this.food.count++;
    }
      this.$dispatch('cart.add', event.target);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
    }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
    font-size: 0    
    color: rgb(0, 160, 220)
    .cart-decrease, .cart-increase        
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        position: relative        
        &.move-transition
            transition: all 0.4s linear;            
            // transform: translateX(0) rotate(0) translate3D(0,0,0);
            transform: translate3d(0,0,0) rotate(0);             
            opacity: 1
        &.move-enter, &.move-leave
            // transform: translateX(36px) rotate(360deg) translate3D(36px,0,0);  
            transform: translate3d(36px,0,0) rotate(360deg);      
            opacity: 0
    .cart-count
        display: inline-block        
        vertical-align: top       
        width: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center             
        font-size: 10px               
        color: rgb(147, 153, 159)
