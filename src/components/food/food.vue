<template>
	<div v-show="showFlag" class="food" transition="slide" v-el:food>
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image">
				<i class="icon-arrow_left" @click="hide"></i>
			</div>
			<div class="food-info">
				<div class="content">
					<h1 class="name">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="new">￥{{food.price}}元</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}元</span>
					</div>
				</div>
				<div class="buy" v-show="!food.count || food.count===0" @click="addFirst" transition="fade">
					加入购物车
				</div>
				<span class="cartcontrol-wrapper" v-show="food.count>0">          
					<cartcontrol :food="food"></cartcontrol>
				</span>
			</div>
			<split v-show="food.info"></split>
			<div class="food-info" v-show="food.info">
				<div class="title">商品介绍</div>
				<div class="text">{{food.info}}</div>
			</div>
			<split></split>
			<div class="ratings">
				<h1 class="title">
						商品评价{{positiveCount}}
				</h1>
				<div class="rating-select-wrapper">
				<ratingselect :ratings="food.ratings" :desc="desc" :only-content="onlyContent" :select-type="selectType"></ratingselect>				
				</div>
			</div>
			<div class="rating-wrapper">
			<div class="no-rating" v-show="!food.ratings || !food.ratings.length">
						暂无评价
					</div>
				<ul v-show="food.ratings && food.ratings.length">
					<li v-show="needShow(rating)" class="rating-item" v-for="rating in food.ratings">
						<div class="rating-info">
							<span class="time">{{rating.rateTime | formatDate}}</span>							
							<div class="user">
								<span class="name">{{rating.username}}</span><img :src="rating.avatar" class="avatar">
							</div>
						</div>
						<p class="text">
							<i :class="{'icon-thumb_down': rating.rateType===1,'icon-thumb_up': rating.rateType===0}"></i>{{rating.text}}
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
import Vue from 'vue';
import {formatDate} from 'common/js/date';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  methods: {
    hide() {
      this.showFlag = false;
    },
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      }); // this._initialScroll();
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      // if (!this.food.count) {
      Vue.set(this.food, 'count', 1);
      // } else {
      // this.food.count++;
      // }
      // console.log(event.target);
      this.$dispatch('cart.add', event.target);
    },
    // _selectRatings() {
    // 	let nrs = [];
    // 	this.food.ratings.forEach((rating) => {
    // 			if ((this.selectType === ALL) || (rating.rateType === this.selectType)) {
    // 				if (rating.text !== '' || !this.onlyContent) {
    // 				nrs.push(rating);
    // 			};
    // 		}
    // 	},
    needShow(rating) {
      console.log('this.selectType: ' + this.selectType + '    ||    this.onlyContent: ' + this.onlyContent);
      console.log('rating.rateType: ' + rating.rateType + '    ||    rating.text: ' + rating.text);
      let needShow = false;
      if ((this.selectType === ALL) || (rating.rateType === this.selectType)) {
        if (rating.text !== '' || !this.onlyContent) {
          needShow = true;
        }
        console.log('needShow: ' + needShow);
        return needShow;
      }
    }
    // ,
    // needShow(contentOnly, rateType) {
    // 			console.log(rating.selectType);
    // 			if ((this.selectType === ALL) || (rating.rateType === this.selectType)) {
    // 				if (rating.text !== '' || !this.onlyContent) {
    // 						return true;
    // 			}
    // 			return false;
    // 	}
    // }
  },
  computed: {
    // positiveCount() {
    // 	// console.log(this.food.ratings.length);
    // 	// return this.food.ratings.length;
    // },
    // negativeCount() {
    // },
    // ,
    // _selectedRatings() {
    // 	let nrs = [];
    // 	this.food.ratings.forEach((rating) => {
    // 			if ((this.selectType === ALL) || (rating.rateType === this.selectType)) {
    // 				if (rating.text !== '' || !this.onlyContent) {
    // 				nrs.push(rating);
    // 			};
    // 		}
    // 	});
    // 	console.log(nrs.length);
    // 	// return nrs;
    // 	this.selectedRatings = nrs;
    // }
  },
  filters: {
	formatDate(time) {
		let date = new Date(time);
		return formatDate(date, 'yyyy-MM-dd hh:mm');
	}
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  events: {
    'ratingtype.select' (selectType) {
      console.log(selectType);
      this.selectType = selectType;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    'content.toggle' (onlyContent) {
      console.log(onlyContent);
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.food
	position: fixed
	left: 0
	top: 0
	bottom: 48px
	background: #fff
	z-index: 30
	width: 100%
	background: #fff
	overflow: hidden	
	&.slide-transition
		transition: all .2s linear
		transform: translate3d(0, 0, 0)		
	&.slide-enter, &.slide-leave		
		transform: translate3d(100%, 0, 0)	
	.image-header
		// Tips: 利用CSS3中设置width:100%, Padding-top: 100%时，height自动设为与width相等的特性来实现图片自适应屏幕宽高		
		position: relative
		width: 100%
		height: 0
		padding-top: 100%		
		img
			width: 100%
			height: 100%
			position: absolute
			left: 0
			top: 0
		.icon-arrow_left
			position: absolute
			top: 0
			left: 0
			padding: 20px 12px
			font-size: 20px
			color: #fff
	.food-info
		padding: 18px
		position: relative
		.content						
			.name
				font-size: 14px
				font-weight: 700
				color: rgb(7, 17, 27)
				line-height: 14px
			.detail
				line-height: 10px
				height: 10px				
				font-size: 0
				margin: 8px 0 18px
				color: rgb(147, 153, 159)
				.sell-count, .rating
					font-size: 10px
				.sell-count
					margin-right: 12px
			.price				
				.new
					font-size: 14px
					font-weight: 700
					color: rgb(240, 20, 20)
					line-height: 24px
					margin-right: 8px
				.old
					font-size: 10px
					font-weight: 700
					color: rgb(147, 153, 159)
					line-height: 24px
					text-decoration: line-through
		.cartcontrol-wrapper
			position: absolute
			right: 12px
			bottom: 12px
		.buy
			position: absolute
			right: 18px
			bottom: 18px
			z-index: 10			
			padding: 6px 12px
			font-size: 10px
			line-height: 12px
			color: #fff
			background: rgb(0, 160, 220)
			border-radius: 12px
			&.fade-transition
				transition: all .2s
				opacity: 1
				&.fade-enter, &.fade-leave
					opacity: 0
	.hr
		height: 16px
		background: #f3f5f7
		border-top: 1px solid rgba(7,17,27,0.1)	
		border-bottom: 1px solid rgba(7,17,27,0.1)	
	.food-info
		padding: 18px
		.title
			font-size: 14px
			color: rgb(7, 17, 27)
			line-height: 14px
		.text
			padding: 6px 8px 0
			font-size: 12px
			font-weight: 200
			color: rgb(77, 85, 93)
			line-height: 24px
	.ratings		
		padding: 18px 18px 0
		border-bottom: 1px solid rgba(7,17,27,0.1)
		.title			
			font-size: 14px			
			color: rgb(7, 17, 27)
			line-height: 14px
		.rating-select-wrapper
			padding: 18px 0
	.rating-wrapper
		padding: 0 18px
		.rating-item
			padding: 16px 0			
			font-size: 12px
			border-1px(rgba(7, 17, 27, 0.1))
			.rating-info
				overflow: hidden
				line-height: 12px
				height: 12px
				margin-bottom: 6px
				.time
					float: left
					color: rgb(147, 153, 159)
					font-size: 0	
					font-size: 10px
				.user
					float: right
					line-height: 12px
					font-size: 0
					.name
						font-size: 10px
						color: rgb(147, 153, 159)
						margin-right: 6px						
					.avatar
						width: 12px
						height: 12px
						border-radius: 50%
						vertical-align: top					
			.text
				line-height: 16px
				font-size: 12px
				color: rgb(7, 17, 27)						
				.icon-thumb_up
					font-size: 12px												
					color: rgb(0, 160, 220)
					margin-right: 4px						
				.icon-thumb_down
					font-size: 12px
					color: rgb(147, 153, 159)
					margin-right: 4px
		.no-rating
			padding: 16px 0
			font-size: 12px
			color: rgb(147, 153, 159)
</style>