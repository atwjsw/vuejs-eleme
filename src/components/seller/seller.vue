<template>
	<div class="seller" :seller="seller" v-el:seller>
		<div class="seller-content">
			<div class="overview">
				<div class="overview-top border-1px">
					<h1 class="title">{{seller.name}}</h1>
					<div class="desc">
						<star :size="36" :score="seller.score"></star>
						<span class="text">({{seller.ratingCount}})</span>
						<span class="text">月售{{seller.sellCount}}单</span>
					</div>
					<div class="favorite" @click="toggleFavorite">
						<div class="icon-favorite" :class="{'on': favorite}"></div>
						<div class="text">{{favoriteText}}</div>
					</div>
				</div>
				<div class="remark">
					<div class="block">
						<h2 class="item-name">起送价</h2>
						<div class="item-info"><span class="value">{{seller.minPrice}}</span><span class="unit">元</span></div>
					</div>
					<div class="block">
						<h2 class="item-name">商家配送</h2>
						<div class="item-info"><span class="value">{{seller.deliveryPrice}}</span><span class="unit">元</div>
					</div>
					<div class="block">
						<h2 class="item-name">平均配送时间</h2>
						<div class="item-info"><span class="value">{{seller.deliveryTime}}</span><span class="unit">分钟</div>
					</div>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h2 class="title">公告与活动</h2>
				<p class="text border-1px">{{seller.bulletin}}</p>
				<ul class="seller-supports">
					<li class="support-item border-1px" v-for="item in seller.supports">
						<i class="icon" :class="[classMap[item.type]]"></i><span class="support-text">{{item.description}}</span>
					</li>
				</ul>
			</div>			
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" v-el:pic-wrapper>
					<ul class="pic-list" v-el:pic-list>
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="item in seller.infos">{{item}}</li>					
				</ul>
			</div>			
		</div>
	</div>
</template>
<script>
	import split from 'components/split/split';
	import star from 'components/star/star';
	import BScroll from 'better-scroll';
	import {saveToLocal, loadFromLocal} from 'common/js/store';

	// const ERR_OK = 0;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				classMap: [],
				// favorite: false
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false);
				})()
			};
		},
		methods: {
			toggleFavorite(event) {
				if (!event._constructed) {
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			},
			_initScroll() {
				if (!this.scroll) {
						this.scroll = new BScroll(this.$els.seller, {click: true});
				} else {
						this.scroll.refresh();
				}
			},
			_initPicScroll() {
					if (this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$els.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if (!this.picScroll) {
							this.picScroll = new BScroll(this.$els.picWrapper, { scrollX: true, 	eventPassthrough: 'vertical' });
						} else {
							this.picScroll.refresh();
						}
					});
				};
			}
		},
		components: {
			split,
			star
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		watch: {
			'seller' () {
				this._initScroll();
				this._initPicScroll();
			}
		},
		ready() {
			this._initScroll();
			this._initPicScroll();
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.seller
	position: fixed
	top: 174px
	left: 0
	bottom: 0
	width: 100%
	overflow: hidden
	.seller-content
		background: #fff
		.overview
			padding: 0 18px
			position: relative	
			.overview-top				
				border-1px(rgba(7, 17, 27, 0.1))
				padding: 18px 0
				.title
					font-size: 14px
					margin-bottom: 8px				
					color: rgb(7, 17, 27)				
				.desc
					font-size: 0
					.star
						display: inline-block
						vertical-align: top
						margin-right: 8px		
					.text
						margin-right: 12px
						display: inline-block
						vertical-align: top
						font-size: 10px					
						line-height: 18px						
						color: rgb(77, 85, 93)
			.favorite
				position: absolute
				width: 50px
				top: 18px
				right: 0
				text-align: center
				.icon-favorite
					font-size: 24px
					line-height: 24px	
					color: #d4d6d9
					margin-bottom: 4px
					&.on
						color: rgb(240, 20, 20)							
				.text				
					line-height: 10px
					font-size: 10px
					color: rgb(77, 85, 93)					
			.remark
				padding: 18px 0
				display: flex
				.block
					flex: 1
					text-align: center
					font-size: 10px
					border-right: 1px solid rgba(7, 17, 27, 0.1)
					&:last-child
						border-right: none
					.item-name
						color: rgb(147, 153, 159)
						margin-bottom: 4px
					.item-info
						.value
							font-size: 24px
							line-height: 24px
							color: rgb(7, 17, 27)							
		.bulletin
			padding: 18px 18px 0					
			.title
				font-size: 14px			
				color: rgb(7, 17, 27)
			.text
				padding: 8px 12px 16px
				font-size: 12px
				line-height: 24px
				color: rgb(240, 20, 20)
				border-1px(rgba(7, 17, 27, 0.1))
			.seller-supports
				.support-item
					padding: 16px 12px
					font-size: 0
					line-height: 16px
					color: rgb(7, 17, 27)
					border-1px(rgba(7, 17, 27, 0.1))
					&:last-child
						border-none()	
					.icon
						margin-right: 6px
						width: 16px
						height: 16px
						display: inline-block
						background-size: 16px
						vertical-align: top
						&.decrease
							bg-image('decrease_4')					
						&.discount
							bg-image('discount_4')					
						&.guarantee
							bg-image('guarantee_4')					
						&.invoice
							bg-image('invoice_4')					
						&.special
							bg-image('special_4')
					.support-text
						font-size: 12px
		.pics
			padding: 18px	
			.title
				font-size: 14px
				color: rgb(7, 17, 27)
				margin-bottom: 12px
			.pic-wrapper
				overflow: hidden
				width: 100%
				// Tips: 这样图片才能不换行
				white-space: nowrap
				.pic-list		
					font-size: 0			
					.pic-item
						width: 120px
						height: 90px 
						display: inline-block				
						margin-right: 6px
						&:last-child 
							margin-right: 0
						img
							width: 100%
							height: 100%
		.info
			padding: 18px 18px 0
			.title
				padding-bottom: 12px
				font-size: 14px
				color: rgb(7, 17, 27)
				border-1px(rgba(7,17,27,0.1))				
			.info-item
				padding: 16px 12px
				font-size: 12px
				line-height: 16px
				color: rgb(7, 17, 27)
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
								
</style>