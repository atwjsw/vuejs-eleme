<template>
  <div class="seller-ratings" v-el:ratings>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overflow-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :score="seller.serviceScore" :size="36"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :score="seller.foodScore" :size="36"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="rating-select-wrapper">
        <ratingselect :ratings="ratings" :desc="desc" :only-content="onlyContent" :select-type="selectType"></ratingselect>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating)">
            <div class="avator">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <p class="seller-rator-info"><span class="name">{{rating.username}}</span><span class="time">{{rating.rateTime | formatDate}}</span></p>
              <p class="star-wrapper">
                <star :size='24' :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span></p>
              <p class="text">
                {{rating.text}}
              </p>
              <p class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="icon" :class="{'icon-thumb_up': rating.rateType == 0, 'icon-thumb_down': rating.rateType == 1}"></i>
                <span class='item' v-for="item in rating.recommend">{{item}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
	</div>
</template>

<script>
import split from 'components/split/split';
import star from 'components/star/star';
import ratingselect from 'components/ratingselect/ratingselect';
import {formatDate} from 'common/js/date';
import BScroll from 'better-scroll';

const ERR_OK = 0;
const ALL = 2;

export default {
	props: {
		seller: {
			type: Object
		}
	},
	data () {
		return {
			ratings: [],
			selectType: ALL,
			onlyContent: true
			// ,
			// desc: {
			// 	all: '全部',
			// 	positive: '满意',
			// 	negative: '不满意'
			// }
		};
	},
	components: {
		split,
		star,
		ratingselect
	},
	created() {
		this.$http.get('/api/ratings').then((response) => {
			response = response.body;
			if (response.errno === ERR_OK) {
				this.ratings = response.data;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$els.ratings, {click: true});
					} else {
						this.scroll.refresh();
					}
				});
			};
	});
	},
	filters: {
		formatDate(time) {
			let date = new Date(time);
			return formatDate(date, 'yyyy-MM-dd hh:mm');
		}
	},
	methods: {
		needShow(rating) {
		let needShow = false;
		if ((this.selectType === ALL) || (rating.rateType === this.selectType)) {
        if (rating.text !== '' || !this.onlyContent) {
          needShow = true;
        }
        // console.log('needShow: ' + needShow);
        return needShow;
      }
    }
	},
	events: {
		'ratingtype.select' (selectType) {
			// console.log(selectType);
			this.selectType = selectType;
			this.$nextTick(() => {
				this.scroll.refresh();
			});
		},
		'content.toggle' (onlyContent) {
			// console.log('obj');
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

.seller-ratings
	position: fixed
	top: 174px
	bottom: 0
	left: 0
	width: 100%	
	background: rgb(255, 255, 255)
	overflow: hidden
	.ratings-content
		.overview
			// width: 100%
			display: flex
			padding: 18px 0			
			.overview-left
				flex: 0 0 137px
				width: 137px
				text-align: center
				border-right: 1px solid rgba(7, 71, 27, 0.1)
				padding: 6px 0
				@media only screen and (max-width: 320px)
					flex: 0 0 120px
					width: 120px			
				.score
					font-size: 24px
					line-height: 28px					
					color: rgb(255, 153, 0)
					margin-bottom: 6px
				.title
					font-size: 12px
					line-height: 12px
					color: rgb(7, 17, 27)
					margin-bottom: 8px					
				.rank
					font-size: 10px
					line-height: 10px
					color: rgb(147, 153, 159)
			.overflow-right
				flex: 1
				padding: 6px 0  6px 24px
				@media screen and (max-width: 320px)
					padding-left: 6px				
				.score-wrapper				
					// line-height: 18px
					// height: 18px
					margin-bottom: 8px
					font-size: 0							
					.title
						display: inline-block
						vertical-align: top
						font-size: 12px
						color: rgb(7, 17, 27)
						line-height: 18px
						// margin-right: 12px						
					.star
						display: inline-block
						vertical-align: top
						// line-height: 18px	
						// height: 18px
						margin: 0 12px
					.score
						display: inline-block
						vertical-align: top
						font-size: 12px
						color: rgb(255, 153, 0)
						// font-weight: 700
						line-height: 18px
				.delivery-wrapper
					font-size: 0
					// line-height: 18px
					.title
						// display: inline-block
						// vertical-align: top
						font-size: 12px
						color: rgb(7, 17, 27)
						line-height: 18px	
					.delivery-time
						margin-left: 12px					
						font-size: 12px
						line-height: 18px						
						color: rgb(147, 153, 159)
	.rating-select-wrapper
		padding: 18px 18px 12px
		border-bottom: 1px solid #ccc
	.rating-wrapper
		padding: 0 18px		
		.rating-item
			padding: 18px 0
			display: flex
			border-1px(rgba(7, 17, 27, 0.1))
			.avator
				flex: 0 0 28px
				width: 28px
				height: 28px
				margin-right: 12px					
				img
					width: 100%
					height: 100%
					border-radius: 50%					
			.content
				flex: 1
				.seller-rator-info
					margin-bottom: 4px
					line-height: 12px
					height: 12px
					font-size: 10px					
					.name
						float: left
						display: inline-block
						color: rgb(7, 17, 27)						
					.time
						float: right
						display: inline-block
						color: rgb(147, 153, 159)						
				.star-wrapper					
					margin-bottom: 6px
					font-size: 0					
					.star
						display: inline-block
						margin-right: 6px						
					.delivery
						line-height: 12px	
						font-size: 10px
						color: rgb(147, 153, 159)						
				.text
					font-size: 12px
					margin-bottom: 6px
					line-height: 18px
				.recommend
					// font-size: 10px
					line-height: 16px
					font-size: 0
					.icon
						// line-height: 16px
						font-size: 9px
						margin-right: 8px
						&.icon-thumb_up
							color: rgb(0, 160, 220)						
						&.icon-thumb_down
							color: rgb(183, 187, 191)					
					.item
						display: inline-block
						padding: 0 6px
						font-size: 9px
						color: rgb(147, 153, 159)
						line-height: 16px
						margin: 2px 8px 2px 0		 				
						border-radius: 1px						
						border: 1px solid rgba(7, 17, 27, 0.1)							
</style>
	

