<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="box">
    <p class="title level">
      <span class="level-left">{{ user.selectedGym.name }}</span>
      <a class="button is-info level-right" @click="update">Update</a>
    </p>
    <div v-if="gym" class="columns is-multiline">
      <div class="column is-full">
        <p class="subtitle">General information</p>
      </div>
      <div class="column is-one-quarter">
        <b-field label="Name">
          <b-input v-model="gym.name"></b-input>
        </b-field>

        <label class="label has-text-centered">Logo <i @click="displayLogo" class="fa fa-search" style="cursor: pointer; vertical-align: middle;"></i></label>
        <div class="file has-name is-centered">
          <label class="file-label">
            <input @change="getLogo" class="file-input" type="file" accept="image/gif,image/jpeg,image/png" name="resume">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fa fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a logo…
              </span>
            </span>
            <span class="file-name" v-if="logoName">
              {{ logoName }}
            </span>
          </label>
        </div>
      </div>

      <div class="column is-three-quarters">
        <b-field label="Description" expanded>
          <b-input type="textarea" maxlength="250" v-model="gym.description"></b-input>
        </b-field>
      </div>

      <div class="column is-full">
        <hr/>
      </div>

      <div class="column is-full">
        <p class="subtitle">Contact</p>
      </div>

      <div class="column is-one-third">
        <b-field label="E-mail">
          <b-input type="email" v-model="gym.email"></b-input>
        </b-field>
      </div>

      <div class="column is-one-third">
        <b-field label="Phone n°1">
          <b-input type="tel" v-model="gym.phone_number1"></b-input>
        </b-field>
      </div>

      <div class="column is-one-third">
        <b-field label="Phone n°2">
          <b-input type="tel" v-model="gym.phone_number2"></b-input>
        </b-field>
      </div>

      <div class="column is-2">
        <b-field label="Street number">
          <b-input type="number" v-model="gym.street_number"></b-input>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Street name">
          <b-input v-model="gym.street_name"></b-input>
        </b-field>
      </div>
      <div class="column is-2">
        <b-field label="City">
          <b-input v-model="gym.city"></b-input>
        </b-field>
      </div>
      <div class="column is-2">
        <b-field label="Postal code">
          <b-input type="number" v-model="gym.postal_code"></b-input>
        </b-field>
      </div>
      <div class="column is-2">
        <b-field label="Country">
          <b-select placeholder="Select a country" v-model="gym.country">
            <option v-for="(country, key) in countries" :value="key">{{ country }}</option>
          </b-select>
        </b-field>
      </div>

      <div class="column is-full">
        <hr/>
      </div>

      <div class="column is-full">
        <p class="subtitle">Staff</p>
      </div>

      <div class="column is-full">
        <b-table
          :data="staff"
          striped
          narrowed
          :loading="loading"
          mobile-cards
          paginated
          per-page="10"
        >
          <template scope="props">
            <b-table-column field="email" label="E-mail" sortable centered>
              {{ props.row.email }}
            </b-table-column>

            <b-table-column field="name" label="First Name" sortable centered>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="lastname" label="Last Name" sortable centered>
              {{ props.row.lastname }}
            </b-table-column>

            <b-table-column field="role" label="Role" sortable centered>
              <b-select class="has-text-centered" v-model="props.row.role">
                <option value="climber">Climbers</option>
                <option value="routesetters">Route setters</option>
                <option value="owner">Owner</option>
              </b-select>
            </b-table-column>
          </template>

          <div slot="empty" class="has-text-centered">
            There is currently no staff members to display.
          </div>
        </b-table>
      </div>

      <div class="column is-full level">
        <div class="level-right">
          <a class="button is-info" @click="update">Update</a>
        </div>
      </div>

    </div>
    <div v-else-if="loading" class="has-text-centered">
      <i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>
    </div>
    <div v-else>
      Error : {{ error }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // TODO : Load logo when user click, otherwise the page is too big

  export default {
    data () {
      return {
        countries: {
          AF: 'Afghanistan',
          AX: 'Aland Islands',
          AL: 'Albania',
          DZ: 'Algeria',
          AS: 'American Samoa',
          AD: 'Andorra',
          AO: 'Angola',
          AI: 'Anguilla',
          AQ: 'Antarctica',
          AG: 'Antigua And Barbuda',
          AR: 'Argentina',
          AM: 'Armenia',
          AW: 'Aruba',
          AU: 'Australia',
          AT: 'Austria',
          AZ: 'Azerbaijan',
          BS: 'Bahamas',
          BH: 'Bahrain',
          BD: 'Bangladesh',
          BB: 'Barbados',
          BY: 'Belarus',
          BE: 'Belgium',
          BZ: 'Belize',
          BJ: 'Benin',
          BM: 'Bermuda',
          BT: 'Bhutan',
          BO: 'Bolivia',
          BA: 'Bosnia And Herzegovina',
          BW: 'Botswana',
          BV: 'Bouvet Island',
          BR: 'Brazil',
          IO: 'British Indian Ocean Territory',
          BN: 'Brunei Darussalam',
          BG: 'Bulgaria',
          BF: 'Burkina Faso',
          BI: 'Burundi',
          KH: 'Cambodia',
          CM: 'Cameroon',
          CA: 'Canada',
          CV: 'Cape Verde',
          KY: 'Cayman Islands',
          CF: 'Central African Republic',
          TD: 'Chad',
          CL: 'Chile',
          CN: 'China',
          CX: 'Christmas Island',
          CC: 'Cocos (Keeling) Islands',
          CO: 'Colombia',
          KM: 'Comoros',
          CG: 'Congo',
          CD: 'Congo, Democratic Republic',
          CK: 'Cook Islands',
          CR: 'Costa Rica',
          CI: 'Cote D\'Ivoire',
          HR: 'Croatia',
          CU: 'Cuba',
          CY: 'Cyprus',
          CZ: 'Czech Republic',
          DK: 'Denmark',
          DJ: 'Djibouti',
          DM: 'Dominica',
          DO: 'Dominican Republic',
          EC: 'Ecuador',
          EG: 'Egypt',
          SV: 'El Salvador',
          GQ: 'Equatorial Guinea',
          ER: 'Eritrea',
          EE: 'Estonia',
          ET: 'Ethiopia',
          FK: 'Falkland Islands (Malvinas)',
          FO: 'Faroe Islands',
          FJ: 'Fiji',
          FI: 'Finland',
          FR: 'France',
          GF: 'French Guiana',
          PF: 'French Polynesia',
          TF: 'French Southern Territories',
          GA: 'Gabon',
          GM: 'Gambia',
          GE: 'Georgia',
          DE: 'Germany',
          GH: 'Ghana',
          GI: 'Gibraltar',
          GR: 'Greece',
          GL: 'Greenland',
          GD: 'Grenada',
          GP: 'Guadeloupe',
          GU: 'Guam',
          GT: 'Guatemala',
          GG: 'Guernsey',
          GN: 'Guinea',
          GW: 'Guinea-Bissau',
          GY: 'Guyana',
          HT: 'Haiti',
          HM: 'Heard Island & Mcdonald Islands',
          VA: 'Holy See (Vatican City State)',
          HN: 'Honduras',
          HK: 'Hong Kong',
          HU: 'Hungary',
          IS: 'Iceland',
          IN: 'India',
          ID: 'Indonesia',
          IR: 'Iran, Islamic Republic Of',
          IQ: 'Iraq',
          IE: 'Ireland',
          IM: 'Isle Of Man',
          IL: 'Israel',
          IT: 'Italy',
          JM: 'Jamaica',
          JP: 'Japan',
          JE: 'Jersey',
          JO: 'Jordan',
          KZ: 'Kazakhstan',
          KE: 'Kenya',
          KI: 'Kiribati',
          KR: 'Korea',
          KW: 'Kuwait',
          KG: 'Kyrgyzstan',
          LA: 'Lao People\'s Democratic Republic',
          LV: 'Latvia',
          LB: 'Lebanon',
          LS: 'Lesotho',
          LR: 'Liberia',
          LY: 'Libyan Arab Jamahiriya',
          LI: 'Liechtenstein',
          LT: 'Lithuania',
          LU: 'Luxembourg',
          MO: 'Macao',
          MK: 'Macedonia',
          MG: 'Madagascar',
          MW: 'Malawi',
          MY: 'Malaysia',
          MV: 'Maldives',
          ML: 'Mali',
          MT: 'Malta',
          MH: 'Marshall Islands',
          MQ: 'Martinique',
          MR: 'Mauritania',
          MU: 'Mauritius',
          YT: 'Mayotte',
          MX: 'Mexico',
          FM: 'Micronesia, Federated States Of',
          MD: 'Moldova',
          MC: 'Monaco',
          MN: 'Mongolia',
          ME: 'Montenegro',
          MS: 'Montserrat',
          MA: 'Morocco',
          MZ: 'Mozambique',
          MM: 'Myanmar',
          NA: 'Namibia',
          NR: 'Nauru',
          NP: 'Nepal',
          NL: 'Netherlands',
          AN: 'Netherlands Antilles',
          NC: 'New Caledonia',
          NZ: 'New Zealand',
          NI: 'Nicaragua',
          NE: 'Niger',
          NG: 'Nigeria',
          NU: 'Niue',
          NF: 'Norfolk Island',
          MP: 'Northern Mariana Islands',
          NO: 'Norway',
          OM: 'Oman',
          PK: 'Pakistan',
          PW: 'Palau',
          PS: 'Palestinian Territory, Occupied',
          PA: 'Panama',
          PG: 'Papua New Guinea',
          PY: 'Paraguay',
          PE: 'Peru',
          PH: 'Philippines',
          PN: 'Pitcairn',
          PL: 'Poland',
          PT: 'Portugal',
          PR: 'Puerto Rico',
          QA: 'Qatar',
          RE: 'Reunion',
          RO: 'Romania',
          RU: 'Russian Federation',
          RW: 'Rwanda',
          BL: 'Saint Barthelemy',
          SH: 'Saint Helena',
          KN: 'Saint Kitts And Nevis',
          LC: 'Saint Lucia',
          MF: 'Saint Martin',
          PM: 'Saint Pierre And Miquelon',
          VC: 'Saint Vincent And Grenadines',
          WS: 'Samoa',
          SM: 'San Marino',
          ST: 'Sao Tome And Principe',
          SA: 'Saudi Arabia',
          SN: 'Senegal',
          RS: 'Serbia',
          SC: 'Seychelles',
          SL: 'Sierra Leone',
          SG: 'Singapore',
          SK: 'Slovakia',
          SI: 'Slovenia',
          SB: 'Solomon Islands',
          SO: 'Somalia',
          ZA: 'South Africa',
          GS: 'South Georgia And Sandwich Isl.',
          ES: 'Spain',
          LK: 'Sri Lanka',
          SD: 'Sudan',
          SR: 'Suriname',
          SJ: 'Svalbard And Jan Mayen',
          SZ: 'Swaziland',
          SE: 'Sweden',
          CH: 'Switzerland',
          SY: 'Syrian Arab Republic',
          TW: 'Taiwan',
          TJ: 'Tajikistan',
          TZ: 'Tanzania',
          TH: 'Thailand',
          TL: 'Timor-Leste',
          TG: 'Togo',
          TK: 'Tokelau',
          TO: 'Tonga',
          TT: 'Trinidad And Tobago',
          TN: 'Tunisia',
          TR: 'Turkey',
          TM: 'Turkmenistan',
          TC: 'Turks And Caicos Islands',
          TV: 'Tuvalu',
          UG: 'Uganda',
          UA: 'Ukraine',
          AE: 'United Arab Emirates',
          GB: 'United Kingdom',
          US: 'United States',
          UM: 'United States Outlying Islands',
          UY: 'Uruguay',
          UZ: 'Uzbekistan',
          VU: 'Vanuatu',
          VE: 'Venezuela',
          VN: 'Viet Nam',
          VG: 'Virgin Islands, British',
          VI: 'Virgin Islands, U.S.',
          WF: 'Wallis And Futuna',
          EH: 'Western Sahara',
          YE: 'Yemen',
          ZM: 'Zambia',
          ZW: 'Zimbabwe'
        },
        gym: null,
        staff: null,
        loading: null,
        error: null,
        logoName: null
      }
    },
    computed: mapGetters({
      user: 'user'
    }),
    created () {
      this.loading = true
      this.error = null
      this.axios.get(process.env.BACKEND + 'gyms/' + this.user.selectedGym.id)
        .then(res => {
          this.gym = res.data.gym
          this.logoName = this.gym.logo ? 'Preview' : 'Add a logo'
          this.staff = res.data.staff
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.error = e.response.statusText
          this.loading = false
        })
    },
    methods: {
      displayLogo () {
        if (this.gym && this.gym.hasOwnProperty('logo') && this.gym.logo) {
          this.$dialog.alert({
            title: 'Logo preview',
            message: '<img src="' + this.gym.logo + '"></img>',
            confirmText: 'OK'
          })
        }
      },
      getLogo (logo) {
        const target = logo.target
        if (target && target.files && target.files.length === 1) {
          const file = target.files[0]
          this.logoName = file.name

          const reader = new window.FileReader()
          const vm = this

          reader.onload = (e) => {
            vm.gym.logo = e.target.result
          }

          reader.readAsDataURL(file)
        }
      },
      update () {
        this.axios.put(process.env.BACKEND + 'gyms/update', {
          gym: this.gym,
          staff: this.staff
        })
          .then(res => {
            this.$toast.open({
              message: this.gym.name + ' successfully updated !',
              type: 'is-success',
              position: 'is-bottom-right'
            })
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
</script>

<style scoped></style>
