<template>
  <div class="header">
    <div class="content-wrapper">
      <img class="avatar" :src="seller.avatar" alt={{seller.name}}>
      <div class="content">
        <p class="title">{{seller.name}}</p>
        <p class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <p class="supports" v-if="seller.supports" :class="[classMap[seller.supports[0].type]]">{{seller.supports[0].description}}</p>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-text">{{seller.bulletin}}
      </span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :score="seller.score" :size="48"></star>
            <!-- <star :score="5" :size="24"></star> -->
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="item in seller.supports" :class="classMap[item.type]">
            	{{item.description}}
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <!--   <p class="seller-bulletin-text">{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}</p> -->
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="hideDetail"></i>
      </div>
    </div>
  </div>
</template>

<script>
import star from 'components/star/star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail: function() {
      this.detailShow = true;
    },
    hideDetail: function() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.header
	// position: fixed
	// top: 0	
	position: relative		
	overflow: hidden;
	color: #fff;
	background: rgba(7,17,27,0.5)
	.background		
		position: absolute
		top: 0
		right: 0
		bottom: 0
		left: 0
		z-index: -1
		filter: blur(10px)
		img
			width: 100%
			height: 100%				
	.content-wrapper		
		position: relative		
		overflow: hidden
		padding: 24px 12px 18px 24px
		font-size: 0
		.avatar			
			display: inline-block;		
			width: 64px
			height: 64px
			margin-right: 16px
			border-radius: 2px
			vertical-align: top		
		.content			
			display: inline-block;
			padding: 2px 0;				
			.title			
				height: 18px
				line-height: 18px
				padding-left: 36px
				font-size: 16px
				line-height: 18px				
				color: rgb(255, 255, 255)
				font-weight: bold
				bg-image('brand')
				background-size: 30px 18px
				background-repeat: no-repeat				
			.description
				margin: 8px 0 10px 0 
				font-size: 12px
				color: rgb(255, 255, 255)				
				line-height: 12px
			.supports
				font-size: 10px
				color: rgb(255, 255, 255)				
				line-height: 12px
				height: 12px
				padding-left: 16px
				background-size: 12px 12px	
				background-repeat: no-repeat						
				&.decrease
					bg-image('decrease_1')					
				&.discount
					bg-image('discount_1')					
				&.guarantee
					bg-image('guarantee_1')					
				&.invoice
					bg-image('invoice_1')					
				&.special
					bg-image('special_1')					
		.support-count
			position: absolute
			right: 12px
			bottom: 14px	
			padding: 7px 8px
			font-size: 10px			
			line-height: 10px
			height: 10px			
			background-color: rgba(7, 17, 27, 0.2)
			border-radius: 14px	
			text-align: center
			.icon-keyboard_arrow_right
				margin-left: 2px
				vertical-align: middle				
	.bulletin-wrapper
		height: 28px
		line-height: 28px		
		padding: 0 22px 0 12px
		background-color: rgba(7, 17, 27, 0.2)
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis	
		position: relative
		.bulletin-text			
			padding: 0 26px
			bg-image('bulletin')
			background-repeat: no-repeat
			background-position: left center
			background-size: 22px 12px
			font-size: 10px;
		.icon-keyboard_arrow_right
			position: absolute;
			font-size: 10px;
			right: 12px;
			top: 8px;			
	.detail
		// position: absolute
		position: fixed
		z-index: 100		
		top: 0
		bottom:0
		left: 0
		right: 0
		overflow: auto
		// background-color: rgba(7,17,27,0.8)
		// blur: 10px		
		color: rgb(255, 255, 255)	
		backdrop-filter: blur(10px)	
		&.fade-transition
			transition: all 0.5s
			opacity: 1
			background: rgba(7, 17, 27, 0.8)				
		&.fade-enter, &.fade-leave
			opacity: 0
			background: rgba(7, 17, 27, 0)
		.detail-wrapper
			min-height: 100%
			width: 100%
			.detail-main
				padding: 64px 36px		
				// text-align: center
				position: relative
				// height: 100%		
				.name			
					font-size: 16px
					font-weight: 700
					line-height: 16px
					text-align: center
				.star-wrapper
					margin-top: 16px
					text-align: center
					padding: 2px 0;					
				.title
					display: flex
					margin: 28px 0 24px
					.text									
						padding: 0 12px				
						font-size: 14px
						font-weight: 700
						// line-height: 14px
					.line								
						flex: 1
						border-bottom: 1px solid rgba(255, 255, 255, 0.2)
						position: relative
						top: -6px
						// margin-bottom: 6px
				.supports
					text-align: left
					font-size: 12px
					color: rgb(255, 255, 255)	
					.support-item									
						line-height: 16px
						// height: 16px
						padding-left: 34px
						background-size: 16px 16px	
						background-repeat: no-repeat
						background-position: 12px center 
						margin-bottom: 12px										
						&.decrease
							bg-image('decrease_2')					
						&.discount
							bg-image('discount_2')					
						&.guarantee
							bg-image('guarantee_2')					
						&.invoice
							bg-image('invoice_2')					
						&.special
							bg-image('special_2')
				.bulletin
					padding: 0 12px
					font-size: 12px
					line-height: 24px
					text-align: left				
		.detail-close
			position: relative			
			height: 32px				
			width: 32px	
			margin: -64px auto 0		
			clear: both
			font-size: 32px		
			.icon-close								
				color: rgba(255, 255, 255, 0.5)
										
</style>