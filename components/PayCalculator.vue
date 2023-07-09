<script setup>
import currency from 'currency.js';
const { data: taxData } = await useFetch('/api/tax/1');

const taxableIncome = ref(taxData.value.medianIncome);
const multiplier = ref(1);

console.log(taxData.value.brackets[0]);

const getTotalTaxForBracket = (bracket) => {
    return currency((bracket.endsAt - bracket.startsAt) * bracket.rate);
};

const calculateTax = (taxableIncome) => {
    if (taxableIncome <= taxData.value.brackets[0].endsAt) {
        return currency(0);
    } else if (taxableIncome <= taxData.value.brackets[1].endsAt) {
        return currency((taxableIncome - taxData.value.brackets[0].endsAt) * taxData.value.brackets[0].rate);
    } else if (taxableIncome <= taxData.value.brackets[2].endsAt) {
        return currency(5092 + (taxableIncome - taxData.value.brackets[1].endsAt) * taxData.value.brackets[1].rate);
    } else if (taxableIncome <= taxData.value.brackets[3].endsAt) {
        return currency(29467 + (taxableIncome - taxData.value.brackets[2].endsAt) * taxData.value.brackets[2].rate);
    } else {
        return currency(51667 + (taxableIncome - taxData.value.brackets[3].endsAt) * taxData.value.brackets[3].rate);
    }
};

const takeHome = (taxableIncome) => {
    return currency(taxableIncome).subtract(calculateTax(taxableIncome));
};

const taxableIncomeAnnual = computed(() => { return taxableIncome.value * multiplier.value });
const tax = computed(() => { return calculateTax(taxableIncomeAnnual.value) });
const takeHomePayAnnual = computed(() => { return takeHome(taxableIncomeAnnual.value) });

const taxableIncomeDisplay = computed(() => { return currency(taxableIncomeAnnual.value).format() });
const weeklytaxableIncome = computed(() => { return currency(taxableIncomeAnnual.value / 52).format() });
const fortnightlytaxableIncome = computed(() => { return currency(taxableIncomeAnnual.value / 26).format() });
const monthlytaxableIncome = computed(() => { return currency(taxableIncomeAnnual.value / 12).format() });

const taxDisplay = computed(() => { return currency(tax.value).format() });
const weeklyTax = computed(() => { return currency(calculateTax(taxableIncomeAnnual.value) / 52).format() });
const fortnightlyTax = computed(() => { return currency(calculateTax(taxableIncomeAnnual.value) / 26).format() });
const monthlyTax = computed(() => { return currency(calculateTax(taxableIncomeAnnual.value) / 12).format() });

const takeHomePayDisplay = computed(() => { return currency(takeHomePayAnnual.value).format() });
const weeklyTakeHomePay = computed(() => { return currency(takeHomePayAnnual.value / 52).format() });
const fortnightlyTakeHomePay = computed(() => { return currency(takeHomePayAnnual.value / 26).format() });
const monthlyTakeHomePay = computed(() => { return currency(takeHomePayAnnual.value / 12).format() });

const superAnnuationRate = 0.11;
const superAnnuationDisplay = `${superAnnuationRate * 100}%`;
const superAnnuation = computed(() => { return currency(takeHomePayAnnual.value * superAnnuationRate).format() });
const weeklySuperAnnuation = computed(() => { return currency(takeHomePayAnnual.value * superAnnuationRate / 52).format() });
const fortnightlySuperAnnuation = computed(() => { return currency(takeHomePayAnnual.value * superAnnuationRate / 26).format() });
const monthlySuperAnnuation = computed(() => { return currency(takeHomePayAnnual.value * superAnnuationRate / 12).format() });

const payCycles = [
    { multiplier: 52, label: 'Weekly' },
    { multiplier: 26, label: 'Fortnightly' },
    { multiplier: 12, label: 'Monthly' },
    { multiplier: 1, label: 'Annually' }
]

const taxYears = [
    { id: 1, label: '2022-2023' }
]
</script>
<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" sm="2">
                    <v-text-field v-model="taxableIncome" hint="Taxable Income" :persistent-hint="true" type="number"
                        step="1000" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-select v-model="multiplier" :items="payCycles" item-title="label" item-value="multiplier"
                        hint="Pay Cycle" :persistent-hint="true">
                    </v-select>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-select v-model="multiplier" :items="taxYears" item-title="label" item-value="id" hint="Tax Year"
                        :persistent-hint="true">
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-divider class="pb-4" sm="2"></v-divider>
                </v-col>
            </v-row>
            <v-row>
                <v-table density="compact">
                    <thead>
                        <tr>
                            <th class="text-left">
                                &nbsp;
                            </th>
                            <th class="text-left amount">
                                Weekly
                            </th>
                            <th class="text-left amount">
                                Fortnightly
                            </th>
                            <th class="text-left amount">
                                Monthly
                            </th>
                            <th class="text-left amount">
                                Annually
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Taxable Income</td>
                            <td>{{ weeklytaxableIncome }}</td>
                            <td>{{ fortnightlytaxableIncome }}</td>
                            <td>{{ monthlytaxableIncome }}</td>
                            <td>{{ taxableIncomeDisplay }}</td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td>{{ weeklyTax }}</td>
                            <td>{{ fortnightlyTax }}</td>
                            <td>{{ monthlyTax }}</td>
                            <td>{{ taxDisplay }}</td>
                        </tr>
                        <tr class="bg-green">
                            <td>Take Home Pay</td>
                            <td>{{ weeklyTakeHomePay }}</td>
                            <td>{{ fortnightlyTakeHomePay }}</td>
                            <td>{{ monthlyTakeHomePay }}</td>
                            <td>{{ takeHomePayDisplay }}</td>
                        </tr>
                        <tr>
                            <td>Superannuation ({{ superAnnuationDisplay }})</td>
                            <td>{{ weeklySuperAnnuation }}</td>
                            <td>{{ fortnightlySuperAnnuation }}</td>
                            <td>{{ monthlySuperAnnuation }}</td>
                            <td>{{ superAnnuation }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-row>
        </v-container>
    </v-form>
</template>
<style scoped>
.pay-calculator-table {
    width: 800px;
}

/* .pay-calculator-table th.heading {
    width: 40%;
} */

.pay-calculator-table th.amount {
    width: 17%;
}
</style>