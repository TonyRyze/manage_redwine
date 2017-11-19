<template>
	<div class="main-content">
		<keep-alive>
			<transition :name="transitionName">
		    	<router-view class="router" v-if="$route.meta.keepAlive"></router-view>
		    </transition>
		</keep-alive>
		<transition :name="transitionName">
			<router-view class="router" v-if="!$route.meta.keepAlive"></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'main-content',
	data () {
		return {
			transitionName: "slide-left"
		}
	},
	components: {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.router {
	    position: absolute;
	    width: 100%;
	    transition: all .3s ease;
	    top: 0;
	}

	.slide-left-enter,
	.slide-right-leave-active {
	     opacity: 0;
	    -webkit-transform: translate(100%, 0);
	    transform: translate(100%, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
	     opacity: 0;
	    -webkit-transform: translate(-100%, 0);
	    transform: translate(-100% 0);
	}
</style>
