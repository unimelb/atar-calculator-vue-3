<template>
  <tr>
		<!-- <div v-bind:class="getCoursedTag(item.score)" class=""> -->
			<td>
                <a :href="item.ugUrl">{{ item.ugName }}</a> /
                <a :href="item.gradUrl">{{ item.gradName }}</a>

            </td>
            <td >
                <div v-if="item.score.gdp" class="">{{item.score.gdp.number}}</div>
                <!-- <div v-else-if="item.score.indigenous" class="">{{item.score.indigenous.number}}</div> -->
                <div v-if="item.score.ug && item.score.international && item.score.ug.number && item.score.international.number" class="">
					<span v-if="studentType == 'domestic'" class="">{{item.score.ug.number}}</span>
					<span v-if="item.score.international && studentType == 'international'" class="">{{item.score.international.number}}</span>
					<!-- <span class="text-italic">Minimum ATAR {{item.year}}</span> -->
					<!-- <span class="card-meta-border"></span> -->
				</div>
                <div v-if="item.score.ug && !item.score.international" class="">
					<span v-if="studentType == 'domestic'">
						<span class="">{{item.score.ug.number}}</span>
						<!-- <span class="">Minimum ATAR {{item.year}}</span> -->
						<!-- <span class=""></span> -->
					</span>
				</div>
                <span v-if="studentType == 'domestic' && !item.score.ug && !item.score.gdp && item.domestic" class="">{{item.domestic}}</span>
                <span v-if="studentType == 'international' && !item.score.ug && !item.score.gdp && item.international" class="">{{item.international}}</span>
                <!-- <div class="" v-if="item.previousYearDom && studentType == 'domestic'">Lowest Selection Rank {{item.year - 1}}: <strong>{{ item.previousYearDom }}</strong> (Guide only)</div> -->
				<!-- <div class="" v-if="item.previousYearInt && studentType == 'international'"> Lowest Selection Rank {{item.year - 1}}: <strong>{{ item.previousYearInt }}</strong> (Guide only)</div> -->
				{{item.isRangeCriteria ? 'Range of Criteria' : ''}}
            </td>
            <td>
                <span v-if="item.score.access">
										{{ item.score.access.number }}
                </span>
            </td>
  </tr>
</template>

<script>
import {
    ButtonIcon
 } from '@unimelb/pattern-lib-vue';
export default {
    name: 'GraduateDegreePackagesView',
    components: {
        ButtonIcon
    },
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

