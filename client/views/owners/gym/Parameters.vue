<!--
Yaty - Climbing Gym Management
Copyright (C) 2017 - Hugo Da Roit <contact@hdaroit.fr>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div class="box">
    <b-loading :active.sync="loading" :canCancel="true"></b-loading>
    <div v-if="ready">
      <p class="title level">
        <span class="level-left">{{ user.selectedGym.name }}</span>
        <a class="button is-info level-right" :disabled="$v.$invalid" :title="$v.$invalid ? 'Please check the validity of your inputs.' : ''" @click="update">Update</a>
      </p>
      <div v-if="gym" class="columns is-multiline">
        <div class="column is-full">
          <p class="subtitle">General information</p>
        </div>
        <div class="column is-one-quarter">
          <b-field label="Name" :type="getType($v.gym.name.$invalid)" :message="getMessage('name')">
            <b-input v-model="gym.name"></b-input>
          </b-field>

          <label class="label">Logo <i @click="displayLogo" class="fa fa-search" style="cursor: pointer; vertical-align: middle;"></i></label>
          <b-field>
            <b-upload @input="setLogo" v-model="files" :multiple="false" accept="image/gif,image/jpeg,image/png">
              <a class="button is-primary">
                <b-icon pack="fa" icon="upload"></b-icon>
                <span class="is-hidden-mobile" :title="logoName || ''">{{ logoName ? logoName.substr(0, 10) + ' ...' :  "Upload a logo"}}</span>
              </a>
            </b-upload>
          </b-field>
        </div>

        <div class="column is-three-quarters">
          <b-field label="Description" expanded :type="getType($v.gym.description.$invalid)" :message="getMessage('description')">
            <b-input type="textarea" v-model="gym.description"></b-input>
          </b-field>
        </div>

        <div class="column is-full">
          <hr/>
          <p class="subtitle">Contact</p>
        </div>

        <div class="column is-one-third">
          <b-field label="E-mail" :type="getType($v.gym.email.$invalid)" :message="getMessage('email')">
            <b-input v-model="gym.email"></b-input>
          </b-field>
        </div>

        <div class="column is-one-third">
          <b-field label="Phone n°1" :type="getType($v.gym.phone_number1.$invalid)" :message="getMessage('phone_number1')">
            <b-input type="tel" v-model="gym.phone_number1"></b-input>
          </b-field>
        </div>

        <div class="column is-one-third">
          <b-field label="Phone n°2" :type="getType($v.gym.phone_number2.$invalid)" :message="getMessage('phone_number2')">
            <b-input type="tel" v-model="gym.phone_number2"></b-input>
          </b-field>
        </div>

        <div class="column is-2">
          <b-field label="Street number" :type="getType($v.gym.street_number.$invalid)" :message="getMessage('street_number')">
            <b-input type="number" v-model="gym.street_number"></b-input>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field label="Street name" :type="getType($v.gym.street_name.$invalid)" :message="getMessage('street_name')">
            <b-input v-model="gym.street_name"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="City" :type="getType($v.gym.city.$invalid)" :message="getMessage('city')">
            <b-input v-model="gym.city"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Postal code" :type="getType($v.gym.postal_code.$invalid)" :message="getMessage('postal_code')">
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

        <div class="column is-full level">
          <hr/>
          <p class="level">
            <span class="subtitle level-left">Staff</span>
            <span class="button is-info is-narrow level-right" @click="addStaff">Add</span>
          </p>
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
                  <option v-for="role in roles" v-if="role" :value="role">{{ role.charAt(0).toUpperCase() + role.slice(1) }}</option>
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
            <a class="button is-info" :disabled="$v.$invalid" :title="$v.$invalid ? 'Please check the validity of your inputs.' : ''" @click="update">Update</a>
          </div>
        </div>

      </div>
      <div v-else-if="error">
        Error : {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { required, requiredIf, minLength, numeric, email, maxLength } from 'vuelidate/lib/validators'

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
        members: null,
        logo: null,
        files: null,
        staff: null,
        loading: null,
        error: null,
        logoName: null,
        logoHasChanged: null,
        roles: null,
        ready: false
      }
    },
    validations: {
      gym: {
        requiredIf: requiredIf('ready'),
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(45)
        },
        id: {
          required,
          numeric
        },
        description: {
          maxLength: maxLength(250)
        },
        'email': {
          required,
          email,
          maxLength: maxLength(45)
        },
        phone_number1: {
          numeric,
          maxLength: maxLength(45)
        },
        phone_number2: {
          numeric,
          maxLength: maxLength(45)
        },
        street_number: {
          numeric,
          maxLength: maxLength(4)
        },
        street_name: {
          maxLength: maxLength(100)
        },
        city: {
          maxLength: maxLength(45)
        },
        postal_code: {
          numeric,
          maxLength: maxLength(45)
        }
      },
      staff: {
        requiredIf: requiredIf('ready'),
        $each: {
          'email': {
            required,
            email
          },
          name: {
            required
          },
          lastname: {
            required
          },
          role: {
            required
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'user'
      })
    },
    created () {
      this.loading = true
      this.error = null
      this.axios.get(process.env.BACKEND + 'gyms/' + this.user.selectedGym.id)
        .then(res => {
          this.gym = res.data.gym
          this.logoName = res.data.logo ? 'New logo' : null
          this.staff = res.data.staff
          return this.axios.get(process.env.BACKEND + 'users/roles')
        })
        .then(res => {
          this.roles = res.data.roles
          this.loading = false
          this.ready = true
        })
        .catch(e => {
          console.log(e)
          this.error = e.response.statusText
          this.loading = false
          this.ready = false
        })
    },
    methods: {
      fetchStaff () {
        return new Promise((resolve, reject) => {
          this.axios.get(process.env.BACKEND + 'gyms/' + this.user.selectedGym.id + '/staff')
            .then(res => {
              this.staff = res.data.staff
              return resolve()
            })
            .catch(reject)
        })
      },
      /**
       * This function take a field name and it's index inside the members array
       * It look into validation to see if some fields are valid or not
       * If some fields are invalid then it will return an appropriate message
       * We are only checking for gym informations
       * @param fieldName The key of the field
       * @param index The position in the members array
       * @returns {string}
       */
      getMessage (fieldName) {
        if (!this.$v.gym.$invalid) return '' // If it's valid there is no need for a message

        const validationStatus = this.$v.gym[fieldName]
        const validations = Object.keys(validationStatus)
        let message = ''

        for (let i = 0; i < validations.length; i++) {
          let validation = validations[i]
          if (!validationStatus[validation] && validation.charAt(0) !== '$') {
            switch (validation) {
              case 'numeric':
                message = 'This field needs to be numeric.'
                break
              case 'email':
                message = 'This email is invalid.'
                break
              case 'required':
                message = 'This field is required.'
                break
              case 'maxLength':
                message = 'This field cannot have more than ' + validationStatus.$params.maxLength.max + ' characters.'
                break
              case 'minLength':
                message = 'This field cannot have less than ' + validationStatus.$params.minLength.min + ' characters.'
                break
            }
            if (message.length > 0) return message
          }
        }

        return message
      },
      getType (fieldIsInvalid) {
        return fieldIsInvalid ? 'is-danger' : ''
      },
      fetchMembers () {
        return new Promise((resolve, reject) => {
          this.axios.get(process.env.BACKEND + 'gyms/members', {
            params: {
              gym: this.user.selectedGym.id
            }
          })
            .then(res => {
              this.members = res.data.members
            })
            .catch(reject)
        })
      },
      addStaff () {
        if (this.members && this.members.length) {
          // TODO : select user e-mail with autocomplete + select role
          this.$dialog.prompt({
            message: `Select a future staff member by his email`,
            inputMaxlength: 45,
            inputPlaceholder: 'example@example.com',
            onConfirm: (value) => {
              for (let i = 0; i < this.members.length; i++) {
                if (this.members[i].email === value) {
                  this.axios.post(process.env.BACKEND + 'gyms/staff/add', { email: value })
                    .then()
                  return
                }
              }
              this.$toast.open('This member doesn\'t exists. Please create this account first.')
              this.addStaff()
              this.fetchStaff().then(() => this.$toast.open('This member is now in the staff !'))
            }
          })
        } else {
          this.fetchMembers().then(() => this.addStaff())
            .catch(e => console.log(e))
        }
      },
      loadLogo () {
        return new Promise((resolve, reject) => {
          this.axios.get(process.env.BACKEND + 'gyms/' + this.user.selectedGym.id + '/logo')
            .then(res => {
              this.logo = res.data
              return resolve()
            })
            .catch(e => {
              console.log(e)
              return reject(e)
            })
        })
      },
      displayLogo () {
        const alert = () => {
          this.$dialog.alert({
            title: 'Logo preview',
            message: '<img alt="Logo" src="' + this.logo + '"></img>',
            confirmText: 'OK'
          })
        }

        if (!this.logo) this.loadLogo().then(alert)
        else alert()
      },
      setLogo () {
        const target = this.files
        if (target && target.length === 1 && /\.(jpe?g|png|gif)$/i.test(target[0].name)) {
          const file = target[0]
          this.logoName = file.name

          const reader = new window.FileReader()

          reader.addEventListener('load', () => {
            this.logo = reader.result
            this.logoHasChanged = true
          }, false)

          reader.readAsDataURL(file)
        }
      },
      update () {
        if (this.$v.$invalid) {
          this.error = 'Can\'t update, check your inputs.'
          return
        }

        this.axios.put(process.env.BACKEND + 'gyms/update', {
          gym: this.gym,
          staff: this.staff
        })
          .then(res => {
            if (this.logoHasChanged) {
              return this.axios.put(process.env.BACKEND + 'gyms/update/logo', {
                gym: this.gym.id,
                logo: this.logo
              })
            }
            return true
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
