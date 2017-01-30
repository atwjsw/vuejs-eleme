<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>         
          <span class="num" v-show="totalCount>0">{{totalCount}}</span>
        </div>
        <span class="price" :class="{'hightlight': totalPrice>0}">￥{{totalPrice}}</span>
        <i class="divider"></i>
        <span class="desc">另需配送费￥{{deliveryPrice}}元</span>
      </div>
      <div class="content-right">
      <div class="pay" :class="{'checkout': isCheckout}">
      	{{payDesc}}
      </div>      
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [
          // {price: 19, count: 2},
          // {
          //   price: 10,
          //   count: 1
          // }
        ];
      }
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return '￥' + this.minPrice + '元起送';
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return '还差￥' + (this.minPrice - this.totalPrice) + '元起送';
      } else {
        return '去结算';
      }
    },
    isCheckout() {
	return this.totalPrice >= this.minPrice;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shopcart
	position: fixed
	left: 0
	bottom: 0
	z-index: 50
	width: 100%
	height: 48px	
	color: rgba(255, 255, 255, 0.4)
	.content
		display: flex
		background: #141d27
		font-size: 0
		.content-right			
			flex: 0 0 105px
			width: 105px			
			.pay
				height: 48px
				line-height: 48px
				text-align: center				
				font-size: 12px
				font-weight: 700						
				background-color: rgba(255, 255, 255, 0.1)
				&.checkout									
					background-color: rgb(0, 180, 60)
					color: #fff					
		.content-left
			flex: 1
			position: relative			
			.logo-wrapper
				display: inline-block
				vertical-align: top
				position: relative
				top: -10px		
				width: 56px
				height: 56px		
				border-radius: 50%				
				margin: 0 12px
				padding: 6px
				box-sizing: border-box								
				text-align: center
				background: #141d27
				z-index: 10
				.num					
					position: absolute
					top: 0
					right: 0
					width: 24px
					height: 16px
					line-height: 16px					
					font-size: 9px
					font-weight: 700					
					color: #fff
					background-color: rgb(240, 20, 20)
					box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
					border-radius: 8px					
				.icon-shopping_cart
					display: inline-block
					width: 100%
					height: 100%
					line-height: 44px
					background-color: rgba(255, 255, 255, 0.1)				
					border-radius: 50%
					font-size: 24px
					&.highlight
						background-color: rgb(0, 160, 220)
						color: #fff						
			.price
				display: inline-block
				vertical-align: top		
				font-size: 16px		
				font-weight: 700
				line-height: 48px
				&.hightlight
					color: #fff				
			.divider
				display: inline-block
				height: 48px
				margin: 0 12px
				color: rgba(255, 255,255,0.1)
				position: relative		
				&:after
					content: ''
					background: rgba(255, 255,255,0.1)			
					position: absolute
					top: 12px
					bottom: 12px
					width: 1px								
			.desc
				display: inline-block
				vertical-align: top		
				font-size: 10px		
				line-height: 48px			
	
</style>