<template>
    <div class="toggle-view__wrapper">
        <div class="toggle-view__inner">
            <a
                href="javascript: void(0);"
                role="tab"
                :aria-selected="showTableViewData"
                tabindex="0"
                aria-label="Toggle Table View"
                class="button__table-view"
                v-bind:class="{ active: showTableViewData }"
                v-on:click.stop.prevent="toggleTableCardView"

            >
                <span class="screenreaders-only">Table View</span>
                <svg><use xlink:href="#icon-table-view"></use></svg>
            </a>
            <a
                href="javascript: void(0);"
                role="tab"
                :aria-selected="showCardView"
                tabindex="0"
                aria-label="Toggle Card View"
                class="button__card-view"
                v-bind:class="{ active: showCardViewData }"
                v-on:click.stop.prevent="toggleTableCardView"
            >
                <span class="screenreaders-only">Card View</span>
                <svg><use xlink:href="#icon-card-view"></use></svg>
            </a>
        </div>
    </div>
</template>

<script>

export default {
	data() {
		return {
			showTableViewData: true,
            showCardViewData: false
		};
	},
	methods: {
		toggleTableCardView(){
            this.showTableViewData = !this.showTableViewData;
            this.showCardViewData = !this.showCardViewData;

            this.$emit('toggle', '');
        }
	},
	props: {
		// this component expects a prop of type object
        showTableView: true,
        showCardView: false
	}
};
</script>
