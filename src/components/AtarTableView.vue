<template>
  <tr>
		<!-- <div v-bind:class="getCoursedTag(item.score)" class=""> -->
			<td>
                <a :href="getCoursedUrl(item.score)" class="">
                    {{ item.name }}
                </a>
            </td>
            <td v-if="studentType == 'domestic'">
                <div v-if="item.score.gdp" class="">{{item.score.gdp.number}}</div>
                <div v-if="item.score.ug && item.score.ug.number " class="">{{item.score.ug.number}}</div>
                <!-- <div v-else-if="item.score.indigenous" class="">{{item.score.indigenous.number}}</div> -->
<!--                <div v-if="item.score.ug && item.score.international && item.score.ug.number && item.score.international.number" class="">              					-->
<!--					<span v-if="studentType == 'domestic'" class="">{{item.score.ug.number}}</span>																			-->
<!--					<span v-if="item.score.international && studentType == 'international'" class="">{{item.score.international.number}}</span> 							-->	
					<!-- <span class="text-italic">Minimum ATAR {{item.year}}</span> -->
					<!-- <span class="card-meta-border"></span> -->
<!--				</div>																																						-->	
                <div v-if="item.score.ug && !item.score.international" class="">
					<span v-if="studentType == 'domestic'">
						<span class="">{{item.score.ug.number}}</span>
						<!-- <span class="">Minimum ATAR {{item.year}}</span> -->
						<!-- <span class=""></span> -->
					</span>
				</div>
                <span v-if="studentType == 'domestic' && !item.score.ug && !item.score.gdp && item.domestic" class="">{{item.domestic}}</span>
<!--                <span v-if="studentType == 'international' && !item.score.ug && !item.score.gdp && item.international" class="">{{item.international}}</span>				-->
                <!-- <div class="" v-if="item.previousYearDom && studentType == 'domestic'">Lowest Selection Rank {{item.year - 1}}: <strong>{{ item.previousYearDom }}</strong> (Guide only)</div> -->
				<!-- <div class="" v-if="item.previousYearInt && studentType == 'international'"> Lowest Selection Rank {{item.year - 1}}: <strong>{{ item.previousYearInt }}</strong> (Guide only)</div> -->
				{{item.isRangeCriteria ? 'Range of Criteria' : ''}}
            </td>
            <td>
                <span v-if="studentType == 'domestic' && item.domesticGuarantee">{{item.domesticGuarantee}}</span>
                <span v-if="studentType == 'international' && item.internationalGuarantee">{{item.internationalGuarantee}}</span>
				<span v-if="!item.internationalGuarantee && !item.domesticGuarantee">-</span>               
            </td>
            <td v-if="studentType == 'domestic'">
                <span>{{item.score && item.score.access && item.score.access.number ? item.score.access.number : '-'}}</span>
			</td>
				<!-- <span v-else-if="item.score.other" class="card-meta-title interest-item__icon">
					<svg focusable="false" aria-hidden="true" class="push-icon__icon">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-signpost">
							<svg id="icon-signpost" viewBox="0 0 512 512" width="100%" height="100%">
								<path d="M487.515 104.485L439.03 152.97a23.998 23.998 0 0 1-16.97 7.029H56c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h160v-8c0-13.255 10.745-24 24-24h32c13.255 0 24 10.745 24 24v8h126.059a24 24 0 0 1 16.97 7.029l48.485 48.485c4.687 4.687 4.687 12.285.001 16.971zM216 368v120c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V368h-80zm240-144H296v-48h-80v48H89.941a24 24 0 0 0-16.97 7.029l-48.485 48.485c-4.686 4.686-4.686 12.284 0 16.971l48.485 48.485a23.998 23.998 0 0 0 16.97 7.029H456c13.255 0 24-10.745 24-24v-80C480 234.745 469.255 224 456 224z">
								</path>
							</svg>
						</use>
					</svg>
				</span> -->
				<!-- <h2 class="card__header">{{ item.name }}</h2>
				<p v-if="item.score.gdp" class="card__meta card-body-large">
					<span class="card-body-extraLarge">{{item.score.gdp.number}}</span>
					<span class="text-italic">Minimum ATAR {{item.year}}</span>
					<span class="card-meta-border"></span>
				</p>
				<p v-if="item.score.indigenous" class="card__meta card-body-large">
					<span class="card-body-extraLarge">{{item.score.indigenous.number}}</span>
					<span class="text-italic">Minimum ATAR {{item.year}}</span>
					<span class="card-meta-border"></span>
				</p>
				<p v-if="item.score.ug && item.score.international && item.score.ug.number && item.score.international.number" class="card__meta card-body-large">
					<span v-if="studentType == 'domestic'" class="card-body-extraLarge">{{item.score.ug.number}}</span>
					<span v-if="item.score.international && studentType == 'international'" class="card-body-extraLarge">{{item.score.international.number}}</span>
					<span class="text-italic">Minimum ATAR {{item.year}}</span>
					<span class="card-meta-border"></span>
				</p>
				<p v-if="item.score.ug && !item.score.international" class="card__meta card-body-large">
					<span v-if="studentType == 'domestic'">
						<span class="card-body-extraLarge">{{item.score.ug.number}}</span>
						<span class="text-italic">Minimum ATAR {{item.year}}</span>
						<span class="card-meta-border"></span>
					</span>
				</p>
				<p class="card-meta-lowest" v-if="item.previousYearDom && studentType == 'domestic'">Lowest Selection Rank {{item.year - 1}}: <strong>{{ item.previousYearDom }}</strong> (Guide only)</p>
				<p class="card-meta-lowest" v-if="item.previousYearInt && studentType == 'international'"> Lowest Selection Rank {{item.year - 1}}: <strong>{{ item.previousYearInt }}</strong> (Guide only)</p>
				<p v-if="item.desc && !item.score.access && !item.score.mcs" class="card-summary">{{ item.desc }}</p>
			
			<div v-if="item.score.access || item.score.mcs" class="card-links-section">
				<p v-if="item.linkSectionHeader" class="card-meta-title text-bold">{{item.linkSectionHeader}}</p>
				<ul class="card-links-list">
					<li class="card-links-link" v-for="(group, index) in item.score" :key="index" :class="`badge badge-${index}`" v-if="index === 'mcs' || index === 'access' && studentType == 'domestic'">
						<span v-if="group.url"><span aria-hidden="true">&#10095;</span> <a :href="group.url" aria-hidden="false">{{friendly[index]}} <span class="aria-links">for {{item.name}}</span>: {{group.number}}</a></span>
						<span v-else><span aria-hidden="true">&#10095; &nbsp;</span>{{friendly[index]}}: {{group.number}}</span>
					</li>
				</ul>
			</div>	 -->
		<!-- </div> -->
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

