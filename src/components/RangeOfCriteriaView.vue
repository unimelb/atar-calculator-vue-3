<template>
  <tr>
		<!-- <div v-bind:class="getCoursedTag(item.score)" class=""> -->
        <td>
            <a :href="getCoursedUrl(item.score)" class="">
                {{ item.name }}
            </a>
        </td>        
  </tr>
</template>

<script>
export default {
	data() {
		return {
			friendly: {
				'ug': 'Minimum',
				'mcs': `Chancellor's Scholarship`,
				'international': 'International Degree',
				'access': 'Access Guaranteed',
				'gdp': 'Graduate Degree Package',
				'indigenous': 'Indigenous Entry',
				'other': 'Pathway (Guaranteed Pathways)'
			}
		};
	},
	filters: {
		capitalize: item => {
			return item.toUpperCase();
		}
	},
	methods: {
		getCoursedUrl (obj) {
			// console.log(lookup);
			for (const item in obj) {
				switch (item) {
					case 'ug':
						return obj[item].url;
						break;
					case 'gdp':
						return obj[item].url;
						break
					case 'indigenous':
						return obj[item].url;
						break;
					case 'other':
						return obj[item].url;
						break;
					default:
						return '#';
				}
			}
		},
		getCoursedTag (obj) {
			// console.log(lookup);
			for (const item in obj) {
				switch (item) {
					case 'ug':
						return 'badge-bachelors';
						break;
					case 'gdp':
						return 'badge-gdps';
						break
					case 'other':
						return 'badge-pathways';
						break;
					default:
						return '';
				}
			}
		}
	},
	watch: { 
		studentType: function(newVal, oldVal) {
			this.studentType = newVal;
		},
		scoreType: function(newVal, oldVal) {
			this.scoreType = newVal;
		}
	},
	props: {
		// this component expects a prop of type object
		scoreType: [String, Number],
		studentType: {
			type: String,
			required: false
		},
		item: {
			type: Object,
			required: true
		}
	}
};
</script>

