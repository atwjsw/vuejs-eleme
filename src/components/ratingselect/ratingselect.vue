<template>
	<div class="rating-select">
		<div class="rating-type border-1px">
          <div class="label all" @click="select(2, $event)" :class="{'active': selectType===2}">
            {{desc.all}}<span class="count">{{ratings.length}}</span>
          </div>
          <div class="label positive" @click="select(0, $event)" :class="{'active': selectType===0}">
            {{desc.positive}}<span class="count">{{positives.length}}</span>
          </div>
          <div class="label negative" @click="select(1, $event)" :class="{'active': selectType===1}">
            {{desc.negative}}<span class="count">{{negatives.length}}</span>
          </div>
        </div>        
        <div class="switch">
        	<i class="icon-check_circle" :class="{'on':onlyContent}" @click="toggleContent"></i>
          <span class="text">只看有内容的评价</span>
        </div>
	</div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
	props: {
		ratings: {
			type: Array,
			default() {
				return [];
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				};
			}
		}
	},
	computed: {
		positives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE;
			});
		},
		negatives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE;
			});
		}
	},
	methods: {
		toggleContent(event) {
			if (!event._constructed) {
				return;
			}
			// console.log(this.onlyContent);
			this.onlyContent = !this.onlyContent;
			this.$dispatch('content.toggle', this.onlyContent);
		},
		select(rateType, event) {
			if (!event._constructed) {
				return;
			}
			this.selectType = rateType;
			this.$dispatch('ratingtype.select', this.selectType);
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.rating-select
	.rating-type
		padding: 0 0 18px
		border-1px(rgba(7,17,27,0.1))
		font-size: 0
		.label				
			padding: 8px 12px
			display: inline-block
			font-size: 12px
			line-height: 16px
			color: rgb(77, 85, 93)
			margin-right: 8px
			border-radius: 2px
			.count
				font-size: 8px
				margin-left: 2px			
			&.all, &.positive
				background: rgba(0, 160, 220, 0.2)
				&.active
					background: rgb(0, 160, 220)
					color: #fff
			&.negative
				background: rgba(77, 85, 93, 0.2)
				&.active
					background: rgb(77, 85, 93)
					color: #fff
	.switch
		padding: 12px 0 0
		line-height: 24px
		height: 24px
		color: rgb(147, 153, 159)
		font-size: 0
		.icon-check_circle
			font-size: 24px					
			&.on
				color: rgb(0, 200, 80)
		.text
			vertical-align: top
			font-size: 12px
			margin-left: 4px
</style>