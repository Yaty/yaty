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
          <b-input :value="gym.name"></b-input>
        </b-field>
        <b-field label="Logo">
          <b-field>
            <b-upload v-model="gym.logo">
              <a class="button is-primary">
                <b-icon pack="fa" icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
            <div v-if="gym.logo">
              <span class="file-name">
                  {{ logo.name }}
              </span>
            </div>
          </b-field>
        </b-field>
      </div>

      <div class="column is-three-quarters">
        <b-field label="Description" expanded>
          <b-input type="textarea" maxlength="250" :value="gym.description"></b-input>
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
          <b-input type="email" :value="gym.email"></b-input>
        </b-field>
      </div>

      <div class="column is-one-third">
        <b-field label="Phone n°1">
          <b-input type="tel" :value="gym.phone_number1"></b-input>
        </b-field>
      </div>

      <div class="column is-one-third">
        <b-field label="Phone n°2">
          <b-input type="tel" :value="gym.phone_number2"></b-input>
        </b-field>
      </div>

      <div class="column is-full">
        <b-field grouped>
          <b-field label="Street number">
            <b-input type="number" :value="gym.street_number"></b-input>
          </b-field>
          <b-field label="Street name">
            <b-input :value="gym.street_name"></b-input>
          </b-field>
          <b-field label="City">
            <b-input :value="gym.city"></b-input>
          </b-field>
          <b-field label="Postal code">
            <b-input type="number" :value="gym.postal_code"></b-input>
          </b-field>
          <b-field label="Country">
            <b-select placeholder="Select a country" :value="gym.country">
              <option v-for="(country, key) in countries" :value="key">{{ country }}</option>
            </b-select>
          </b-field>
        </b-field>
      </div>

      <div class="column is-full">
        <hr/>
      </div>

      <div class="column is-full">
        <p class="subtitle">Staff</p>
      </div>

      <div class="column is-full">
        Set owners here
        Set routesetters here
        Wait for multiselect buefy
      </div>

      <div class="column is-full has-text-centered">
        <a class="button is-info" @click="update">Update</a>
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
  // TODO : set binded value in adress field
  import { mapGetters } from 'vuex'

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
        logo: null, // to remove once in gym
        gym: null,
        loading: null,
        error: null
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
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.error = e.response.statusText
          this.loading = false
        })
    },
    methods: {
      update () {
      }
    }
  }
</script>

<style scoped></style>
