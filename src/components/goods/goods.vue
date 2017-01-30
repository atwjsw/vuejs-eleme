<template>
  <div class="goods">
  	<div class="menu-wrapper" v-el:menu-wrapper>
    <ul>
      <li class="menu-item" v-for="item in goods" :class="{'current':currentIndex===$index}" @click="selectMenu($index, $event)">
        <span class="text border-1px">
		<i class="icon" v-show="item.type>=0" :class="classMap[item.type]"></i>
        {{item.name}}
        </span>
      </li>
    </ul>
	</div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li class="food-list food-list-hook" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="food in item.foods">
              <img class="icon" :src="food.icon" alt="food.name">
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <p class="extra">
                  <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </p>
                <p class="price"><span class="new">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span></p>
              </div>
              <i class="icon-add_circle" @click="selectFood(food)"></i>
              <span class="item-num">{{food.count}}</span>
      			<!-- <i class="icon-remove_circle_outline"></i>  -->
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></shopcart>  
</template>



<script>
import shopcart from 'components/shopcart/shopcart';
import BScroll from 'better-scroll';

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectFoods: []
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
  //       for (let i = 0; i < this.goods.length; i++) {
		// 	for (let j = 0; j < this.goods[i].length; j++) {
		// 		(this.goods[i]).foods[j][count] = 0;
		// 	}
		// }
		// console.log(this.goods[0].foods);
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      };
    });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
	selectMenu(index, event) {
		if (!event._constructed) {
			return;
		}
		let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
		let el = foodList[index];
		this.foodsScroll.scrollToElement(el, 300);
	},
	selectFood(food) {
		food.count++;
		// this.selectFoods.push(item);
		console.log(food.name + ' ' + food.count);
	},
    _initScroll() {
      this.menuScroll = new BScroll(this.$els.menuWrapper, {click: true});
      this.foodsScroll = new BScroll(this.$els.foodsWrapper, {probeType: 3});
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
		console.log('this.scrollY ' + this.scrollY);
      });
    },
    _calculateHeight() {
      let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  components: {
      shopcart
  }
};
</script>





<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.goods
	position: fixed
	top: 174px
	bottom: 46px
	width: 100%	
	display: flex
	background: rgb(255, 255, 255)
	overflow: hidden
	.menu-wrapper
		fix: 0 0 80px				
		width: 80px
		background: #f3f5f7
		// height: 100%	
		// font-size: 12px
		// overflow-y: auto			
		.menu-item
			display: table	
			height: 54px
			width: 56px
			line-height: 14px
			padding: 0 12px			
			// color: rgba(7, 17, 27, 0.7)					
			&.current
				position: relative
				z-index: 10
				margin-top: -1px
				background-color: #fff
				color: rgb(7, 17, 27)
				font-weight: 700
				.text
					border-none()	
			.text				
				display: table-cell
				font-size: 12px
				vertical-align: middle
				border-1px(rgba(7, 17, 27, 0.1))							
				.icon
					display: inline-block
					width: 12px
					height: 12px
					// margin-right: 2px
					background-size: 12px 12px	
					background-repeat: no-repeat					
					vertical-align: top				
					&.decrease
						bg-image('decrease_3')					
					&.discount					
						bg-image('discount_3')			
					&.guarantee
						bg-image('guarantee_3')					
					&.invoice
						bg-image('invoice_3')					
					&.special
						bg-image('special_3')					
	.foods-wrapper		
		flex: 1
		// overflow-y: auto
		// .food-list
			// width: 100%
			.title
				height: 26px
				line-height: 26px						
				padding-left: 14px
				font-size: 12px
				color: rgb(147, 153, 159)
				border-left: 2px solid #d9dde1
				background-color: #f3f5f7
			// .category-list
				// padding: 0 18px
				.food-item
					margin: 18px
					padding-bottom: 18px					
					// border-bottom: 1px solid rgba(7, 17, 27, 0.1)
					border-1px(rgba(7, 17, 27, 0.1))
					position: relative
					display: flex
					&:last-child
						border-none()
						// padding-bottom: 0
						margin-bottom: 0					
					.icon
						// display: inline-block
						width: 57px
						height: 57px
						flex: 0 0 57px
						vertical-align: top
						margin-right: 10px
					.content
						// display: inline-block
						flex: 1
						.name 
							font-size: 14px
							margin: 2px 0 8px
							color: rgb(7, 17, 27)	
							line-height: 14px					
						.desc, .extra
							font-size: 10px							
							color: rgb(147, 153, 159)
							line-height: 10px
						.desc
							margin-bottom: 8px
							line-height: 12px
						.extra
							span:first-child
								margin-right: 12px				
						.price
							font-weight: 700
							line-height: 24px
							.new
								font-size: 14px
								color: rgb(240, 20, 20)						
								margin-right: 8px							
							.old
								text-decoration: line-through
								font-size: 10px
								color: rgb(147, 153, 159)
					.icon-add_circle
						position: absolute
						right: 0
						bottom: 18px
						color: rgb(0, 160, 220)
						font-size: 24px
						line-height: 24px
					.icon-remove_circle_outline
						position: absolute
						right: 42px
						bottom: 18px
						color: rgb(0, 160, 220)
						font-size: 24px
						line-height: 24px
					.item-num
						position: absolute
						right: 48px
						bottom: 18px
						color: rgb(147, 153, 159)
						font-size: 10px
						line-height: 24px						

</style>