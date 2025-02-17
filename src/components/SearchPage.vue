<template>
  <SpriteSheet />
  <div class="container-fluid" id="atar-calculator">
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      style="display: none"
    >
      <symbol
        version="1.1"
        id="icon-table-view"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 64 64"
        style="enable-background: new 0 0 64 64"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M55.5,21.41c0,1.1-0.9,2-2,2H11.1c-1.1,0-2-0.9-2-2v-8.31c0-1.1,0.9-2,2-2h42.4c1.1,0,2,0.9,2,2V21.41z"
            />
          </g>
          <g>
            <path
              d="M55.5,36.46c0,1.1-0.9,2-2,2H11.1c-1.1,0-2-0.9-2-2v-8.31c0-1.1,0.9-2,2-2h42.4c1.1,0,2,0.9,2,2V36.46z"
            />
          </g>
          <g>
            <path
              d="M55.5,51.51c0,1.1-0.9,2-2,2H11.1c-1.1,0-2-0.9-2-2v-8.31c0-1.1,0.9-2,2-2h42.4c1.1,0,2,0.9,2,2V51.51z"
            />
          </g>
        </g>
      </symbol>

      <symbol
        version="1.1"
        id="icon-card-view"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 64 64"
        style="enable-background: new 0 0 64 64"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M20.35,11.28c1.1,0,2,0.9,2,2v14.08c0,1.1-0.9,2-2,2H11c-1.1,0-2-0.9-2-2V13.28c0-1.1,0.9-2,2-2H20.35z"
            />
          </g>
          <g>
            <path
              d="M36.68,11.28c1.1,0,2,0.9,2,2v14.08c0,1.1-0.9,2-2,2h-9.35c-1.1,0-2-0.9-2-2V13.28c0-1.1,0.9-2,2-2H36.68z"
            />
          </g>
          <g>
            <path
              d="M53,11.28c1.1,0,2,0.9,2,2v14.08c0,1.1-0.9,2-2,2h-9.35c-1.1,0-2-0.9-2-2V13.28c0-1.1,0.9-2,2-2H53z"
            />
          </g>
          <g>
            <path
              d="M20.35,34.65c1.1,0,2,0.9,2,2v14.08c0,1.1-0.9,2-2,2H11c-1.1,0-2-0.9-2-2V36.65c0-1.1,0.9-2,2-2H20.35z"
            />
          </g>
          <g>
            <path
              d="M36.68,34.65c1.1,0,2,0.9,2,2v14.08c0,1.1-0.9,2-2,2h-9.35c-1.1,0-2-0.9-2-2V36.65c0-1.1,0.9-2,2-2H36.68z"
            />
          </g>
          <g>
            <path
              d="M53,34.65c1.1,0,2,0.9,2,2v14.08c0,1.1-0.9,2-2,2h-9.35c-1.1,0-2-0.9-2-2V36.65c0-1.1,0.9-2,2-2H53z"
            />
          </g>
        </g>
      </symbol>

      <symbol
        xmlns="http://www.w3.org/2000/svg"
        viewBox="1 1 22 22"
        id="icon-info"
      >
        <path
          d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
        ></path>
      </symbol>
    </svg>
    <form v-on:submit="getfilteredData" class="atar-form">
      <div class="number-section">
        <div class="number-wrapper">
          <div class="number-input-section">
            <p class="number-heading">{{ typeHeadingLabel }}</p>
            <input
              aria-invalid="false"
              id="atar-score"
              aria-label="Enter your ATAR Score to filter the list of courses and other options"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              step="1"
              class="form-control"
              v-on:keypress.enter.stop.prevent
              v-model="search"
              @keyup="onKeyUp"
              min="50"
              max="99.95"
            />
          </div>
          <div class="slide-wrapper">
            <CustomSlideBar
              v-model="displayValueSlider"
              :range="slider.range"
              :min="5000"
              :max="9995"
              :step="100"
            >
            </CustomSlideBar>
          </div>
        </div>
      </div>
      <div class="filter-section">
        <div class="filter-wrapper">
          <div class="filter-radio-section">
            <span aria-hidden="true" class="intro-text">{{
              typeStackLabel
            }}</span>
            <fieldset>
              <legend class="screenreaders-only">{{ typeStackLabel }}</legend>
              <ul>
                <li v-for="(stack, index) in typeStacks">
                  <input
                    type="radio"
                    v-bind:id="stack.id"
                    v-model="typeSelected"
                    v-bind:value="stack.value"
                    name="filter"
                    v-on:change="getfilteredData"
                    class="sq-form-field"
                    checked="checked"
                    aria-controls="atar-table-results"
                    v-on:keypress.enter.stop.prevent
                  />
                  <label v-bind:for="stack.id">{{ stack.label }}</label>
                </li>
              </ul>
            </fieldset>
          </div>
          <!-- <div class="filter-dropdown-section">
                      <label for="filter-selector" aria-hidden="true"> {{ filterStackLabel }} Legacy</label>
                      <fieldset>
                          <legend class="screenreaders-only">{{ filterStackLabel }}</legend>
                          <div class="styled-select">
                              <select v-model="filterSelected" aria-controls="atar-calculator-results" id="filter-selector" v-on:change="getfilteredData" v-on:keypress.enter.stop.prevent>
                                  <option v-for="(stack,index) in filterStacks" v-bind:value="stack.value">
                                      {{ stack.label }}
                                  </option>
                              </select>
                          </div>
                      </fieldset>
                  </div> -->
          <div class="filter-dropdown-wrapper">
            <div aria-hidden="true" class="filter-stack-label">
              {{ filterStackLabel }}
            </div>
            <FilterDropdown
              :options="filterStacks"
              :placeholder-label="{
                default: 'All interest areas',
                plural: 'interest areas', // string, required
                singular: 'interest area', // string, required
              }"
              v-model="filterSelected"
              @change="getfilteredData"
              @clear="onClear"
              aria-label="Select a study area of interest to filter the list of courses and other options below"
              aria-controls="inpage-links chancellor-banner-section atar-table-results range-criteria-table-results gdp-table-results gdp-pathways-results"
            ></FilterDropdown>
          </div>
        </div>

        <div class="filter-button-wrapper">
          <button
            class="btn btn--cta"
            type="submit"
            v-on:click.stop.prevent="resultsSubmitButton"
            aria-hidden="false"
            aria-label="Update course list"
          >
            Update Results
          </button>
        </div>
      </div>
    </form>
    <div class="section" v-if="loading">
      <div class="section__inner">
        <div>
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <br />Loading courses
        </div>
      </div>
    </div>
    <div class="section" v-if="filteredData.length === 0 && !loading">
      <div class="section__inner">
        <div>
          <h3>
            {{
              getContentById(content, "atar-table-results", "noResultsHeading")
            }}
          </h3>
          <ul>
            <li
              v-for="(item, index) in getContentById(
                content,
                'atar-table-results',
                'noResultsBullets'
              )"
              :key="index"
              :item="item"
            >
              <p v-html="item"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="section-wrapper" v-if="!loading && filteredData.length > 0">
      <div id="inpage-links" class="section">
        <div class="section__inner">
          <h2>
            {{ getContentById(content, "inpage-links", "sectionHeading") }}
          </h2>
          <p>
            {{ getContentById(content, "inpage-links", "sectionSubHeading") }}
          </p>
          <!-- <in-page-navigation
                  color="navy"
                  title="on this page"
                  heading-level="h2"
              >
              </in-page-navigation> -->

          <div class="grid grid--4col">
            <list-item v-if="filteredAtarData.length > 0">
              <!-- <card-link href="#atar-table-results" :thumb="false" title="ATAR based entry" inverted></card-link> -->
              <button-icon
                class="study-option-btn"
                href="#atar-table-results"
                icon="chevron-down">
                Courses with ATAR-based entry
                </button-icon
              >
                <svg style="width: 20px; height: 20px; fill: black;">
                  <use xlink:href="../styles/icons/sprite/#icon-arrow-down.svg"></use>
                </svg>
            </list-item>
            <list-item v-if="filteredRangeCriteriaData.length > 0">
              <!-- <card-link href="#range-criteria-table-results" :thumb="false" title="Range of Criteria entry" inverted></card-link> -->
              <button-icon
                class="study-option-btn"
                href="#range-criteria-table-results"
                icon="chevron-down"
                >Courses with a range of criteria</button-icon
              >
            </list-item>
            <list-item v-if="filteredGdpData.length > 0">
              <!-- <card-link href="#gdp-table-results" :thumb="false" title="Graduate Degree Packages" inverted></card-link> -->
              <button-icon
                class="study-option-btn"
                href="#gdp-table-results"
                icon="chevron-down"
                >Graduate Degree Packages</button-icon
              >
            </list-item>
            <list-item v-if="filteredPathwaysData.length > 0">
              <!-- <card-link  href="#gdp-pathways-results" :thumb="false" title="Pathways to graduate study" inverted></card-link> -->
              <button-icon
                class="study-option-btn"
                href="#gdp-pathways-results"
                icon="chevron-down"
                >Career pathways</button-icon
              >
            </list-item>
          </div>

          <section id="atar-table-results" v-if="filteredAtarData.length < 1">
            <div>
              <h3>
                {{
                  getContentById(
                    content,
                    "atar-table-results",
                    "noResultsHeading"
                  )
                }}
              </h3>
              <ul>
                <li
                  v-for="(item, index) in getContentById(
                    content,
                    'atar-table-results',
                    'noResultsBullets'
                  )"
                  :key="index"
                  :item="item"
                >
                  <p v-html="item"></p>
                </li>
              </ul>
            </div>
          </section>

          <section id="atar-table-results" v-if="filteredAtarData.length > 0">
            <h3 id="navigation-link-1">
              {{
                getContentById(content, "atar-table-results", "sectionHeading")
              }}
            </h3>
            <!--                    <p>{{getContentById(content,'atar-table-results','sectionSubHeading')}}</p>     -->
            <p
              v-if="isInternational"
              v-html="
                getContentById(
                  content,
                  'atar-table-results',
                  'sectionSubHeadingInternational'
                )
              "
            ></p>
            <p
              v-else
              v-html="
                getContentById(
                  content,
                  'atar-table-results',
                  'sectionSubHeading'
                )
              "
            ></p>

            <p aria-live="polite">
              <em
                >{{ filteredAtarData.length }}
                {{
                  getContentById(
                    content,
                    "atar-table-results",
                    "sectionCountText"
                  )
                }}
                {{ search }}</em
              >
            </p>
            <toggle-view-button
              @toggle="toggleAtarTableCardView"
              :showTableView="showAtarTableView"
              :showCardView="showAtarCardView"
            ></toggle-view-button>
            <!-- <div class="toggle-view__wrapper">
                      <div class="toggle-view__inner">
                          <a
                              class="button__table-view"
                              v-bind:class="{ active: showTableView }"
                              v-on:click.stop.prevent="toggleTableCardView"

                          >
                              <span class="screenreaders-only">Table View</span>
                              <svg><use xlink:href="#icon-table-view"></use></svg>
                          </a>
                          <a
                              class="button__card-view"
                              v-bind:class="{ active: showCardView }"
                              v-on:click.stop.prevent="toggleTableCardView"
                          >
                              <span class="screenreaders-only">Card View</span>
                              <svg><use xlink:href="#icon-card-view"></use></svg>
                          </a>
                      </div>
                  </div>  -->

            <table
              v-if="showAtarTableView"
              class="table table--tight course-list-table"
              tabindex="0"
              aria-label="Atar calculator results"
              item-selector=".item"
              horizontal-order="true"
            >
              <thead>
                <tr class="table__row--inverted">
                  <th>Course</th>
                  <!--                    <th>
                          <span v-if="studentType == 'domestic'">Domestic</span>
                          <span v-if="studentType == 'international'">International</span>
                      minimum</th>
-->
                  <th v-if="studentType == 'domestic'">
                    Lowest selection rank {{ courseYear - 1 }}
                  </th>
                  <th>
                    <span v-if="studentType == 'domestic'">Domestic</span>
                    <span v-if="studentType == 'international'"
                      >International</span
                    >
                    guaranteed ATAR {{ courseYear }}
                  </th>
                  <th v-if="studentType == 'domestic'">
                    Access Melbourne guarantee {{ courseYear }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <atar-table-view
                  class=""
                  v-for="(item, index) in filteredAtarData"
                  :key="index"
                  :item="item"
                  :studentType="studentType"
                  :scoreType="search"
                >
                  <!-- block item markup -->
                </atar-table-view>
              </tbody>
            </table>

            <div v-if="showAtarCardView">
              <div
                class="grid grid--3col"
                id="atar-calculator-results"
                tabindex="0"
                aria-label="Atar calculator results"
                item-selector=".item"
                horizontal-order="true"
              >
                <atar-item-card
                  v-masonry-tile
                  class="item"
                  v-for="(item, index) in filteredAtarData"
                  :key="index"
                  :item="item"
                  :studentType="studentType"
                  :scoreType="search"
                >
                  <!-- block item markup -->
                </atar-item-card>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div
        class="section"
        v-if="filteredGdpData.length > 0"
      >
        <div class="section__inner">
          <section id="gdp-table-results" v-if="filteredGdpData.length > 0">
            <h3 id="navigation-link-3">
              {{
                getContentById(content, "gdp-table-results", "sectionHeading")
              }}
            </h3>
            <p
              v-html="
                getContentById(
                  content,
                  'gdp-table-results',
                  'sectionSubHeading'
                )
              "
            />
            <p>
              <em
                >{{ filteredGdpData.length }}
                {{
                  getContentById(
                    content,
                    "gdp-table-results",
                    "sectionCountText"
                  )
                }}</em
              >
            </p>
            <toggle-view-button
              aria-controls="gdp-table-results-table-panel"
              @toggle="toggleGdpTableCardView"
              :showTableView="showGdpTableView"
              :showCardView="showGdpCardView"
            ></toggle-view-button>
            <table
              id="gdp-table-results-table-panel"
              v-if="showGdpTableView"
              class="table table--white table--tight course-list-table"
              tabindex="0"
              aria-label="Atar calculator results"
              item-selector=".item"
              horizontal-order="true"
            >
              <col class="col-width-a" />
              <thead>
                <tr class="table__row--inverted">
                  <th colspan="1">Course</th>
                  <th colspan="1">
                    <span v-if="studentType == 'domestic'">Domestic</span>
                    <span v-if="studentType == 'international'"
                      >International</span
                    >
                    guaranteed ATAR {{ courseYear }}
                  </th>
                  <th colspan="1">
                    Access Melbourne guarantee {{ courseYear }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <grad-degree-packages-view
                  v-for="(item, index) in filteredGdpData"
                  :key="index"
                  :item="item"
                  :studentType="studentType"
                  :scoreType="search"
                >
                  <!-- block item markup -->
                </grad-degree-packages-view>
              </tbody>
            </table>

            <!-- <div v-if="showGdpCardView">
                  <div class="grid grid--3col" tabindex="0" aria-label="Atar calculator results"  item-selector=".item" horizontal-order="true">
                      <grad-degree-packages-card-view v-masonry-tile class="item" v-for="(item, index) in filteredGdpData" :key="index" :item="item" :studentType="studentType" :scoreType="search"> -->
            <!-- block item markup -->
            <!-- </grad-degree-packages-card-view>
                  </div>
              </div> -->
            <div v-if="showGdpCardView">
              <div
                class="grid grid--3col"
                id="gdp-card-results"
                tabindex="0"
                aria-label="Graduate Degree Packages"
                item-selector=".item"
                horizontal-order="true"
              >
                <grad-degree-item-card
                  v-masonry-tile
                  class="item"
                  v-for="(item, index) in filteredGdpData"
                  :key="index"
                  :item="item"
                  :studentType="studentType"
                  :scoreType="search"
                >
                  <!-- block item markup -->
                </grad-degree-item-card>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="section" v-if="filteredRangeCriteriaData.length > 0">
        <div class="section__inner">
          <section id="range-criteria-table-results">
            <div>
              <h3 id="navigation-link-2">
                {{
                  getContentById(
                    content,
                    "range-criteria-table-results",
                    "sectionHeading"
                  )
                }}
              </h3>
              <!--                       <p>{{getContentById(content,'range-criteria-table-results','sectionSubHeading')}}</p>                            -->
              <p
                v-html="
                  getContentById(
                    content,
                    'range-criteria-table-results',
                    'sectionSubHeading'
                  )
                "
              ></p>
              <p>
                <em
                  >{{ filteredRangeCriteriaData.length }}
                  {{
                    getContentById(
                      content,
                      "range-criteria-table-results",
                      "sectionCountText"
                    )
                  }}</em
                >
              </p>
            </div>

            <toggle-view-button
              @toggle="toggleRangeTableCardView"
              :showTableView="showRangeTableView"
              :showCardView="showRangeCardView"
            ></toggle-view-button>
            <div v-if="showRangeTableView" class="grid grid--2col">
              <div class="cell--desk-3of4">
                <table
                  class="table table--white table--tight course-list-table"
                  tabindex="0"
                  aria-label="Atar calculator results"
                  item-selector=".item"
                  horizontal-order="true"
                >
                  <thead>
                    <tr class="table__row--inverted">
                      <th>Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    <range-of-criteria-view
                      class=""
                      v-for="(item, index) in filteredRangeCriteriaData"
                      :key="index"
                      :item="item"
                      :studentType="studentType"
                      :scoreType="search"
                    >
                      <!-- block item markup -->
                    </range-of-criteria-view>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="showRangeCardView">
              <div
                class="grid grid--3col"
                id="range-card-results"
                tabindex="0"
                aria-label="Atar calculator results"
                item-selector=".item"
                horizontal-order="true"
              >
                <range-item-card
                  v-masonry-tile
                  class="item"
                  v-for="(item, index) in filteredRangeCriteriaData"
                  :key="index"
                  :item="item"
                  :studentType="studentType"
                  :scoreType="search"
                >
                  <!-- block item markup goes here-->
                </range-item-card>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="section__inner">
        <section
          id="gdp-pathways-results"
          v-if="filteredPathwaysData.length > 0"
        >
          <h3 id="navigation-link-4">
            {{
              getContentById(content, "gdp-pathways-results", "sectionHeading")
            }}
          </h3>
          <p
            v-html="
              getContentById(
                content,
                'gdp-pathways-results',
                'sectionSubHeading'
              )
            "
          />
          <card-course-list :items="filteredPathwaysData"></card-course-list>
        </section>
        <section id="app-version">
          <em
            >{{ appName }} - version: {{ appMajorVersion }}.{{
              appMinorVersion
            }}.{{ appPatchVersion }}</em
          >
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import AtarItemCard from "./AtarItemCard.vue";
import RangeItemCard from "./RangeItemCard.vue";
import AtarTableView from "./AtarTableView.vue";
import RangeOfCriteriaView from "./RangeOfCriteriaView.vue";
import GradDegreePackagesView from "./GradDegreePackagesView.vue";
import GradDegreeItemCard from "./GradDegreeItemCard.vue";
import InterestCard from "./InterestCard.vue";
import ToggleViewButton from "./ToggleViewButton.vue";
import CustomSlideBar from './CustomSlideBar.vue';
import SpriteSheet from "./SpriteSheet.vue";
import {
  CardLink,
  CardCourse,
  CardCourseList,
  InPageNavigation,
  SectionWrap,
  ListItem,
  FilterDropdown,
  FocusWrapper,
  ButtonIcon
} from "@unimelb/pattern-lib-vue";
import axios from "axios";
import cloneDeep from "lodash.clonedeep";
import optionsTest from "../data/atar-data-2020/options-test.json";

function transduceInterestAreas(data){
  const filteredData = data.filter(item => item.value !== 'all');
    return filteredData.map((item,idx) => {
        return {
            label: item.label,
            name: item.label.toLowerCase(),
            //name: 'name'+ idx,
            value: item.value,
            isChecked: false, //(item.label == 'Health')
            // options: [] this is causing our filter to break
        }
    });
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function getTableView(){
    var query = getQueryVariable('view');
    console.log('query.match', query);
    return (query == 'table');
}

//getTableView();

function transduceGradPathways(data){
    return data.map(item => {
        return {
                    title: item.name,
                    category: '',
                    type: 'pathway',
                    link: item.score.other && item.score.other.url ? item.score.other.url : ''
                }
    });
}

export default {
    name: 'SearchPage',
    components: {
        AtarItemCard,
        RangeItemCard,
        ButtonIcon,
        AtarTableView,
        RangeOfCriteriaView,
        GradDegreePackagesView,
        GradDegreeItemCard,
        ListItem,
        SectionWrap,
        CardLink,
        CardCourse,
        CardCourseList,
        InPageNavigation,
        InterestCard,
        CustomSlideBar,
        FilterDropdown,
        FocusWrapper,
        ToggleViewButton,
        SpriteSheet
    },
    props: {
      thumb: {
        type: [String, Boolean],
        default: false
      },
    },
    computed: {
      isInternational() {
        return this.studentType === "international";
      },
    },
    data() {
      return {
            courseYear: null,
            appName: 'ATAR Calculator App',
            appMajorVersion: '2',
            appMinorVersion: '2',
            appPatchVersion: '1',
            courseTypes: {
                plural: 'interest areas', // string, required
                singular: 'interest area', // string, required
            },
            optionsLabel: 'Course types to include:', // string - inserted in the dropdown body before checkboxes
            disabled: false, // boolean, false by default
            loading: false,
            info: null,
            content: [],
            //noResultsBullets: this.getContentById(content,'atar-table-results','noResultsBullets'),
            filteredData: [],
            showAtarTableView: false,
            showAtarCardView: true,
            showRangeTableView: false,
            showRangeCardView: true,
            showGdpTableView: false,
            showGdpCardView: true,
            filteredAtarData: [],
            filteredRangeCriteriaData: [],
            filteredGdpData: [],
            filteredPathwaysData: [],
            lastChangedOptions: [],
            search: null,
            searchDefault: '90',
            displayValueSlider: 5000,
            studentType: '',
            sort: '',
            typeStackLabel: 'I am a',
            typeHeadingLabel: 'My ATAR is',
            typeSelected: 'domestic',
            typeStacks: [{
                    value: 'domestic',
                    label: 'Domestic student',
                    id: 'dom',
                    checked: false
                },
                {
                    value: 'international',
                    label: 'International student',
                    id: 'int',
                    checked: true
                }
            ],
            filterStackLabel: 'My area of interest is',
            //filterStackLabel: '',
            //filterSelected: 'all',
            filterSelected: ['all'], // filters are now multi select
            //filterStacks: [],
            filterStacks: optionsTest, //need initial data or dropdown complains
            rangeValue: {},
            slider: {
                value: 5000,
                range: [{
                        label: '50.00'
                    },
                    {
                        label: '51.00',
                        isHide: !0
                    },
                    {
                        label: '52.00',
                        isHide: !0
                    },
                    {
                        label: '53.00',
                        isHide: !0
                    },
                    {
                        label: '54.00',
                        isHide: !0
                    },
                    {
                        label: '55.00',
                        isHide: !0
                    },
                    {
                        label: '56.00',
                        isHide: !0
                    },
                    {
                        label: '57.00',
                        isHide: !0
                    },
                    {
                        label: '58.00',
                        isHide: !0
                    },
                    {
                        label: '59.00',
                        isHide: !0
                    },
                    {
                        label: '60.00'
                    },
                    {
                        label: '61.00',
                        isHide: !0
                    },
                    {
                        label: '62.00',
                        isHide: !0
                    },
                    {
                        label: '63.00',
                        isHide: !0
                    },
                    {
                        label: '64.00',
                        isHide: !0
                    },
                    {
                        label: '65.00',
                        isHide: !0
                    },
                    {
                        label: '66.00',
                        isHide: !0
                    },
                    {
                        label: '67.00',
                        isHide: !0
                    },
                    {
                        label: '68.00',
                        isHide: !0
                    },
                    {
                        label: '69.00',
                        isHide: !0
                    },
                    {
                        label: '70.00'
                    },
                    {
                        label: '71.00',
                        isHide: !0
                    },
                    {
                        label: '72.00',
                        isHide: !0
                    },
                    {
                        label: '73.00',
                        isHide: !0
                    },
                    {
                        label: '74.00',
                        isHide: !0
                    },
                    {
                        label: '75.00',
                        isHide: !0
                    },
                    {
                        label: '76.00',
                        isHide: !0
                    },
                    {
                        label: '77.00',
                        isHide: !0
                    },
                    {
                        label: '78.00',
                        isHide: !0
                    },
                    {
                        label: '79.00',
                        isHide: !0
                    },
                    {
                        label: '80.00'
                    },
                    {
                        label: '81.00',
                        isHide: !0
                    },
                    {
                        label: '82.00',
                        isHide: !0
                    },
                    {
                        label: '83.00',
                        isHide: !0
                    },
                    {
                        label: '84.00',
                        isHide: !0
                    },
                    {
                        label: '85.00',
                        isHide: !0
                    },
                    {
                        label: '86.00',
                        isHide: !0
                    },
                    {
                        label: '87.00',
                        isHide: !0
                    },
                    {
                        label: '88.00',
                        isHide: !0
                    },
                    {
                        label: '89.00',
                        isHide: !0
                    },
                    {
                        label: '90.00'
                    },
                    {
                        label: '91.00',
                        isHide: !0
                    },
                    {
                        label: '92.00',
                        isHide: !0
                    },
                    {
                        label: '93.00',
                        isHide: !0
                    },
                    {
                        label: '94.00',
                        isHide: !0
                    },
                    {
                        label: '95.00',
                        isHide: !0
                    },
                    {
                        label: '96.00',
                        isHide: !0
                    },
                    {
                        label: '97.00',
                        isHide: !0
                    },
                    {
                        label: '98.00',
                        isHide: !0
                    },
                    {
                        label: '99.00',
                        isHide: !0
                    },
                    {
                        label: '99.95'
                    }
                ]
            }
        };
    },
    watch: {
        displayValueSlider: function(newValue) {
            const roundedATAR = Math.round(newValue / 5) * 5;
            this.search = (roundedATAR / 100);

            this.getfilteredData();
        }
    },
    methods: {
        toggleAtarTableCardView(){
            this.showAtarTableView = !this.showAtarTableView;
            this.showAtarCardView = !this.showAtarCardView;
        },
        toggleRangeTableCardView(){
            this.showRangeTableView = !this.showRangeTableView;
            this.showRangeCardView = !this.showRangeCardView;
        },
        toggleGdpTableCardView(){
            this.showGdpTableView = !this.showGdpTableView;
            this.showGdpCardView = !this.showGdpCardView;
        },

        // toggle(){
        //     var meRefs = this.$refs;
        //     console.log('meRefs:', meRefs)
        // },
        getContentById(content, id, param) {
    // Check if content is an array and has items
    if (Array.isArray(content) && content.length) {
        const contentItem = content.filter(item => item.sectionId === id);
        // Ensure contentItem has at least one element and param exists in the first item
        return contentItem.length ? contentItem[0][param] : undefined;
    }
    // Handle the case when content is not an array or is empty
    console.warn("getContentById: 'content' is not an array or is empty");
    return undefined;
},

        onChange(changedOptions) {
            this.filterStacks = changedOptions;
        },
        hideDropdown() {
            this.isVisible = !this.isVisible;
        },
        onClear() {
            this.filterStacks = cloneDeep(this.initialOptions);
            this.lastChangedOptions = []; // clear any cached options
            this.getfilteredData();

        },
        onKeyUp() {
            // do not submit new ATAR until its at least two characters long
            if (this.search !== '' && this.search.length > 1) {

                this.getfilteredData();
            }
        },
        getfilteredData: function(changedOptions) {
            this.filteredData = this.info;
            this.filteredAtarData = this.info;
            this.filteredRangeCriteriaData = this.info;
            this.filteredGdpData = this.info;
            this.filteredPathwaysData = this.info;
            let filteredDataByfilters = [];
            let filteredDataBySearch = [];
            let typeSelect = this.typeSelected;
            let filterSelect = ['all'];
            let atarScore = this.search;
            //let atarBumped = parseFloat(atarScore) + parseFloat(2);
            let atarBumped = parseFloat(atarScore); // removed buffer
            this.studentType = typeSelect;
            let includes = [];
            let hasOptions;

            hasOptions = changedOptions ? true : false;
            let isArray = changedOptions && changedOptions.length ? true : false;

            if (hasOptions && isArray) {
                let cleanOptions = JSON.parse(JSON.stringify(changedOptions)); // removes vue observers
                // console.log('clean options: ', cleanOptions);
                this.filterStacks = cleanOptions;
                this.lastChangedOptions = cleanOptions;

                const result = cleanOptions.filter(item => item.isChecked);
                const data = result.map(item => {
                    return {
                        label: item.label,
                        name: item.name,
                        value: item.value
                    }
                });

                filterSelect = result.length ? result.map(item => item.value) : ['all'];

            } else {


                if (!isArray && this.lastChangedOptions.length > 0) {
                    const newOptions = this.lastChangedOptions;
                    this.filterStacks = newOptions;
                    const result = newOptions.filter(item => item.isChecked);
                    const data = result.map(item => {
                        return {
                            label: item.label,
                            name: item.name,
                            value: item.value
                        }
                    });

                    filterSelect = result.length ? result.map(item => item.value) : ['all'];
                }

            }

            if (this.search !== '') {

                let filteredDataBySearch = this.info.filter(obj => {

                    const minAtar = typeSelect !== 'international'
                                    && obj.score.access
                                    && obj.score.access.number
                                    ? obj.score.access.number : obj[typeSelect];

                    return filterSelect.filter( item => {
                       if (obj.filter.toLowerCase().includes(item) ) {
                           return minAtar <= atarBumped;
                       }
                    }).length;

                })
                .sort((a, b) => {
                    if (a.sort < b.sort) {
                        return -1;
                    }
                    if (a.sort > b.sort) {
                        return 1;cleanOptionscleanOptions
                    }
                });

                this.filteredData = filteredDataBySearch;
                this.filteredAtarData = filteredDataBySearch.filter(item => (!item.isRangeCriteria && !item.isPathways && !item.isGdp));
                this.filteredRangeCriteriaData = filteredDataBySearch.filter(item => item.isRangeCriteria);
                this.filteredGdpData = filteredDataBySearch.filter(item => item.isGdp);
                this.filteredPathwaysData = transduceGradPathways(filteredDataBySearch.filter(item => item.isPathways));

                //setTimeout(() => this.triggerMasonry(), 600);
            }

            // If there is more than one character in the input
            if (this.search.length > 1) {
                // If there is more than 5 characters in the input
                if (this.search.length > 5) {
                    this.search = this.search.substring(0, 5);
                    return false;
                }
                this.displayValueSlider = atarScore * 100;
            }
        },
        triggerMasonry: function() {
            this.$nextTick(() => this.$redrawVueMasonry());
        },
        resultsSubmitButton: function() {
            //document.getElementById("atar-table-results").scrollIntoView();
            this.getfilteredData();
        },
    },
    mounted() {
        this.loading = true;
        axios.all([
            axios.get('/public/data-2024/data.json'),
            axios.get('/public/data-2024/filter.json'),
            axios.get('/public/data-2024/content.json')
        ])
        .then(axios.spread((records, filter, content) => {
            this.info = records.data;

            this.content = content.data;
            this.filterStacks = transduceInterestAreas(filter.data);
            this.initialOptions = transduceInterestAreas(filter.data);
            this.search = this.$route.query.atar ? this.$route.query.atar : this.searchDefault;
            this.getfilteredData();
            this.loading = false;

            var showTable = getTableView();

            this.showAtarTableView = showTable;
            this.showAtarCardView = !showTable;
            this.showRangeTableView = showTable;
            this.showRangeCardView = !showTable;
            this.showGdpTableView = showTable;
            this.showGdpCardView = !showTable;

            const record = records.data.find(item => item.name === 'Bachelor of Science');
            this.courseYear = record.year;
        }))
        .catch(error => {
            this.loading = false;
            console.log(error);
        });
    }
  }


</script>
