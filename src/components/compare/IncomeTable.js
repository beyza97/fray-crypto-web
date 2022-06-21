import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Dropdown } from 'primereact/dropdown';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import { thousandFormat } from '../../helpers/common';
function count_duplicate(a) {
    let counts = {};
    let name = {};
    let count = {};
    let final = [];

    for (let i = 0; i < a.length; i++) {
        if (counts[a[i]]) {
            counts[a[i]] += 1;
        } else {
            counts[a[i]] = 1;
        }
    }
    for (let prop in counts) {
        if (counts[prop] >= 2) {
            name = prop;
            count = counts[prop];
            final.push({ name, count });
        }
    }
    return final;
}

function count_duplicate_2(a) {
    let counts = {};
    let name = {};
    let count = {};
    let final = [];

    for (let i = 0; i < a.length; i++) {
        if (counts[a[i]]) {
            counts[a[i]] += 1;
        } else {
            counts[a[i]] = 1;
        }
    }
    for (let prop in counts) {
        if (counts[prop] >= 1) {
            name = prop;
            count = counts[prop];
            final.push({ name, count });
        }
    }
    return final;
}

export const IncomeTable = (prop) => {
    const {
        set,
        comp,
        arr_number,
        financials,
        debt,
        wc,
        balance,
        financials2,
        debt2,
        wc2,
        balance2,
        code,
        code2
    } = prop

    const [activeIndex, setActiveIndex] = useState(0);
    const years = [comp[0].value.substring(0, 4), comp[1].value.substring(0, 4)];
    const [activeYear, setActiveYear] = useState(years[0]);

    var control = [];
    {
        financials.periods.map((val, i) => control.push(val.year));
    }

    var controlData = (controlData = count_duplicate(control));

    if (controlData.length == 0 || !controlData) {
        controlData = count_duplicate_2(control);
    }

    var yearArray = [];

    for (let i = 0; i < controlData.length; i++) {
        yearArray.push(controlData[i].name);
    }

    var y1 = parseInt(activeYear);
    var year_array1 = [0, 0, 0, 0];
    var year_array1_usd = [0, 0, 0, 0];
    var year_array1_eur = [0, 0, 0, 0];

    var year_array2 = [0, 0, 0, 0];
    var year_array2_usd = [0, 0, 0, 0];
    var year_array2_eur = [0, 0, 0, 0];

    if (set == 1) {
        for (let y = 0; y < financials.periods.length; y++) {
            for (let x = 0; x < financials.rows[arr_number].values.length; x++) {
                if (
                    financials.periods[y].relatingPeriod != 0 &&
                    financials.periods[y].relatingPeriod == 1
                ) {
                    if (financials.periods[y].relatingYear == y1) {
                        year_array1[0] = financials.rows[arr_number].values[y];
                        year_array1_usd[0] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = financials.rows[arr_number].eurValues[y];
                        year_array2[0] = financials2.rows[arr_number].values[y];
                        year_array2_usd[0] = financials2.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = financials2.rows[arr_number].eurValues[y];
                    }
                } else if (
                    financials.periods[y].relatingPeriod == 0 &&
                    financials.periods[y].month == "3"
                ) {
                    if (financials.periods[y].year == y1) {
                        year_array1[0] = financials.rows[arr_number].values[y];
                        year_array1_usd[0] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = financials.rows[arr_number].eurValues[y];
                        year_array2[0] = financials2.rows[arr_number].values[y];
                        year_array2_usd[0] = financials2.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = financials2.rows[arr_number].eurValues[y];
                    }
                }

                //
                if (
                    financials.periods[y].relatingPeriod != 0 &&
                    financials.periods[y].relatingPeriod == 2
                ) {
                    if (financials.periods[y].relatingYear == y1) {
                        year_array1[1] = financials.rows[arr_number].values[y];
                        year_array1_usd[1] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[1] = financials.rows[arr_number].eurValues[y];
                        year_array2[1] = financials2.rows[arr_number].values[y];
                        year_array2_usd[1] = financials2.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = financials2.rows[arr_number].eurValues[y];
                    }
                } else if (
                    financials.periods[y].relatingPeriod == 0 &&
                    financials.periods[y].month == "6"
                ) {
                    if (financials.periods[y].year == y1) {
                        year_array1[1] = financials.rows[arr_number].values[y];
                        year_array1_usd[1] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[1] = financials.rows[arr_number].eurValues[y];
                        year_array2[1] = financials2.rows[arr_number].values[y];
                        year_array2_usd[1] = financials2.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = financials2.rows[arr_number].eurValues[y];
                    }
                }

                //

                if (
                    financials.periods[y].relatingPeriod != 0 &&
                    financials.periods[y].relatingPeriod == 3
                ) {
                    if (financials.periods[y].relatingYear == y1) {
                        year_array1[2] = financials.rows[arr_number].values[y];
                        year_array1_usd[2] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = financials.rows[arr_number].eurValues[y];
                        year_array2[2] = financials2.rows[arr_number].values[y];
                        year_array2_usd[2] = financials2.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = financials2.rows[arr_number].eurValues[y];
                    }
                } else if (
                    financials.periods[y].relatingPeriod == 0 &&
                    financials.periods[y].month == "9"
                ) {
                    if (financials.periods[y].year == y1) {
                        year_array1[2] = financials.rows[arr_number].values[y];
                        year_array1_usd[2] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = financials.rows[arr_number].eurValues[y];
                        year_array2[2] = financials2.rows[arr_number].values[y];
                        year_array2_usd[2] = financials2.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = financials2.rows[arr_number].eurValues[y];
                    }
                }

                //

                if (
                    financials.periods[y].relatingPeriod != 0 &&
                    financials.periods[y].relatingPeriod == 4
                ) {
                    if (financials.periods[y].relatingYear == y1) {
                        year_array1[3] = financials.rows[arr_number].values[y];
                        year_array1_usd[3] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[3] = financials.rows[arr_number].eurValues[y];
                        year_array2[3] = financials2.rows[arr_number].values[y];
                        year_array2_usd[3] = financials2.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = financials2.rows[arr_number].eurValues[y];
                    }
                }

                if (
                    financials.periods[y].relatingPeriod == 0 &&
                    financials.periods[y].month == "12"
                ) {
                    if (financials.periods[y].year == y1) {
                        year_array1[3] = financials.rows[arr_number].values[y];
                        year_array1_usd[3] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[3] = financials.rows[arr_number].eurValues[y];
                        year_array2[3] = financials2.rows[arr_number].values[y];
                        year_array2_usd[3] = financials2.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = financials2.rows[arr_number].eurValues[y];
                    }
                }
            }
        }
    }

    if (set == 2) {
        for (let y = 0; y < financials.periods.length; y++) {
            for (let x = 0; x < balance.rows.length; x++) {
                if (balance.rows[x].label == "Ana Ortaklığa Ait Özkaynaklar") {
                    for (let i = 0; i < balance.rows[x].values.length; i++) {
                        if (
                            financials.periods[y].relatingPeriod != 0 &&
                            financials.periods[y].relatingPeriod == 1
                        ) {
                            if (financials.periods[y].relatingYear == y1) {
                                year_array1[0] = balance.rows[x].values[y];
                                year_array1_usd[0] = balance.rows[x].usdValues[y];
                                year_array1_eur[0] = balance.rows[x].eurValues[y];
                                year_array2[0] = balance2.rows[x].values[y];
                                year_array2_usd[0] = balance2.rows[x].usdValues[y];
                                year_array2_eur[0] = balance2.rows[x].eurValues[y];
                            }
                        } else if (
                            financials.periods[y].relatingPeriod == 0 &&
                            financials.periods[y].month == "3"
                        ) {
                            if (financials.periods[y].year == y1) {
                                year_array1[0] = balance.rows[x].values[y];
                                year_array1_usd[0] = balance.rows[x].usdValues[y];
                                year_array1_eur[0] = balance.rows[x].eurValues[y];
                                year_array2[0] = balance2.rows[x].values[y];
                                year_array2_usd[0] = balance2.rows[x].usdValues[y];
                                year_array2_eur[0] = balance2.rows[x].eurValues[y];
                            }
                        }
                        //

                        if (
                            financials.periods[y].relatingPeriod != 0 &&
                            financials.periods[y].relatingPeriod == 2
                        ) {
                            if (financials.periods[y].relatingYear == y1) {
                                year_array1[1] = balance.rows[x].values[y];
                                year_array1_usd[1] = balance.rows[x].usdValues[y];
                                year_array1_eur[1] = balance.rows[x].eurValues[y];
                                year_array2[1] = balance2.rows[x].values[y];
                                year_array2_usd[1] = balance2.rows[x].usdValues[y];
                                year_array2_eur[1] = balance2.rows[x].eurValues[y];
                            }
                        } else if (
                            financials.periods[y].relatingPeriod == 0 &&
                            financials.periods[y].month == "6"
                        ) {
                            if (financials.periods[y].year == y1) {
                                year_array1[1] = balance.rows[x].values[y];
                                year_array1_usd[1] = balance.rows[x].usdValues[y];
                                year_array1_eur[1] = balance.rows[x].eurValues[y];
                                year_array2[1] = balance2.rows[x].values[y];
                                year_array2_usd[1] = balance2.rows[x].usdValues[y];
                                year_array2_eur[1] = balance2.rows[x].eurValues[y];
                            }
                        }

                        if (
                            financials.periods[y].relatingPeriod != 0 &&
                            financials.periods[y].relatingPeriod == 3
                        ) {
                            if (financials.periods[y].relatingYear == y1) {
                                year_array1[2] = balance.rows[x].values[y];
                                year_array1_usd[2] = balance.rows[x].usdValues[y];
                                year_array1_eur[2] = balance.rows[x].eurValues[y];
                                year_array2[2] = balance2.rows[x].values[y];
                                year_array2_usd[2] = balance2.rows[x].usdValues[y];
                                year_array2_eur[2] = balance2.rows[x].eurValues[y];
                            }
                        } else if (
                            financials.periods[y].relatingPeriod == 0 &&
                            financials.periods[y].month == "9"
                        ) {
                            if (financials.periods[y].year == y1) {
                                year_array1[2] = balance.rows[x].values[y];
                                year_array1_usd[2] = balance.rows[x].usdValues[y];
                                year_array1_eur[2] = balance.rows[x].eurValues[y];
                                year_array2[2] = balance2.rows[x].values[y];
                                year_array2_usd[2] = balance2.rows[x].usdValues[y];
                                year_array2_eur[2] = balance2.rows[x].eurValues[y];
                            }
                        }

                        //
                        if (
                            financials.periods[y].relatingPeriod != 0 &&
                            financials.periods[y].relatingPeriod == 4
                        ) {
                            if (financials.periods[y].relatingYear == y1) {
                                year_array1[3] = balance.rows[x].values[y];
                                year_array1_usd[3] = balance.rows[x].usdValues[y];
                                year_array1_eur[3] = balance.rows[x].eurValues[y];
                                year_array2[3] = balance2.rows[x].values[y];
                                year_array2_usd[3] = balance2.rows[x].usdValues[y];
                                year_array2_eur[3] = balance2.rows[x].eurValues[y];
                            }
                        } else if (
                            financials.periods[y].relatingPeriod == 0 &&
                            financials.periods[y].month == "12"
                        ) {
                            if (financials.periods[y].year == y1) {
                                year_array1[3] = balance.rows[x].values[y];
                                year_array1_usd[3] = balance.rows[x].usdValues[y];
                                year_array1_eur[3] = balance.rows[x].eurValues[y];
                                year_array2[3] = balance2.rows[x].values[y];
                                year_array2_usd[3] = balance2.rows[x].usdValues[y];
                                year_array2_eur[3] = balance2.rows[x].eurValues[y];
                            }
                        }
                    }
                }
            }
        }
    }

    if (set == 3) {
        for (let y = 0; y < wc.periods.length; y++) {
            for (let x = 0; x < wc.rows[arr_number].values.length; x++) {
                if (
                    wc.periods[y].relatingPeriod != 0 &&
                    wc.periods[y].relatingPeriod == 1
                ) {
                    if (wc.periods[y].relatingYear == y1) {
                        year_array1[0] = wc.rows[arr_number].values[y];
                        year_array1_usd[0] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = wc.rows[arr_number].eurValues[y];
                        year_array2[0] = wc2.rows[arr_number].values[y];
                        year_array2_usd[0] = wc2.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = wc2.rows[arr_number].eurValues[y];
                    }
                } else if (
                    wc.periods[y].relatingPeriod == 0 &&
                    wc.periods[y].month == "3"
                ) {
                    if (wc.periods[y].year == y1) {
                        year_array1[0] = wc.rows[arr_number].values[y];
                        year_array1_usd[0] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = wc.rows[arr_number].eurValues[y];
                        year_array2[0] = wc2.rows[arr_number].values[y];
                        year_array2_usd[0] = wc2.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = wc2.rows[arr_number].eurValues[y];
                    }
                }

                //

                if (
                    wc.periods[y].relatingPeriod != 0 &&
                    wc.periods[y].relatingPeriod == 2
                ) {
                    if (wc.periods[y].relatingYear == y1) {
                        year_array1[1] = wc.rows[arr_number].values[y];
                        year_array1_usd[1] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[1] = wc.rows[arr_number].eurValues[y];
                        year_array2[1] = wc2.rows[arr_number].values[y];
                        year_array2_usd[1] = wc2.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = wc2.rows[arr_number].eurValues[y];
                    }

                } else if (
                    wc.periods[y].relatingPeriod == 0 &&
                    wc.periods[y].month == "6"
                ) {
                    if (wc.periods[y].year == y1) {
                        year_array1[1] = wc.rows[arr_number].values[y];
                        year_array1_usd[1] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[1] = wc.rows[arr_number].eurValues[y];
                        year_array2[1] = wc2.rows[arr_number].values[y];
                        year_array2_usd[1] = wc2.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = wc2.rows[arr_number].eurValues[y];
                    }

                }

                //

                if (
                    wc.periods[y].relatingPeriod != 0 &&
                    wc.periods[y].relatingPeriod == 3
                ) {
                    if (wc.periods[y].relatingYear == y1) {
                        year_array1[2] = wc.rows[arr_number].values[y];
                        year_array1_usd[2] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = wc.rows[arr_number].eurValues[y];
                        year_array2[2] = wc2.rows[arr_number].values[y];
                        year_array2_usd[2] = wc2.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = wc2.rows[arr_number].eurValues[y];
                    }

                } else if (
                    wc.periods[y].relatingPeriod == 0 &&
                    wc.periods[y].month == "9"
                ) {
                    if (wc.periods[y].year == y1) {
                        year_array1[2] = wc.rows[arr_number].values[y];
                        year_array1_usd[2] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = wc.rows[arr_number].eurValues[y];
                        year_array2[2] = wc2.rows[arr_number].values[y];
                        year_array2_usd[2] = wc2.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = wc2.rows[arr_number].eurValues[y];
                    }
                }

                //
                if (
                    wc.periods[y].relatingPeriod != 0 &&
                    wc.periods[y].relatingPeriod == 4
                ) {
                    if (wc.periods[y].relatingYear == y1) {
                        year_array1[3] = wc.rows[arr_number].values[y];
                        year_array1_usd[3] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[3] = wc.rows[arr_number].eurValues[y];
                        year_array2[3] = wc2.rows[arr_number].values[y];
                        year_array2_usd[3] = wc2.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = wc2.rows[arr_number].eurValues[y];
                    }
                } else if (
                    wc.periods[y].relatingPeriod == 0 &&
                    wc.periods[y].month == "12"
                ) {
                    if (wc.periods[y].year == y1) {
                        year_array1[3] = wc.rows[arr_number].values[y];
                        year_array1_usd[3] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[3] = wc.rows[arr_number].eurValues[y];
                        year_array2[3] = wc2.rows[arr_number].values[y];
                        year_array2_usd[3] = wc2.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = wc2.rows[arr_number].eurValues[y];
                    }
                }
            }
        }
    }

    if (set == 4) {
        for (let y = 0; y < debt.periods.length; y++) {
            for (let x = 0; x < debt.rows[arr_number].values.length; x++) {
                if (
                    debt.periods[y].relatingPeriod != 0 &&
                    debt.periods[y].relatingPeriod == 1
                ) {
                    if (debt.periods[y].relatingYear == y1) {
                        year_array1[0] = debt.rows[arr_number].values[y];
                        year_array1_usd[0] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = debt.rows[arr_number].eurValues[y];
                        year_array2[0] = debt2.rows[arr_number].values[y];
                        year_array2_usd[0] = debt2.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = debt2.rows[arr_number].eurValues[y];
                    }
                } else if (
                    debt.periods[y].relatingPeriod == 0 &&
                    debt.periods[y].month == "3"
                ) {
                    if (debt.periods[y].year == y1) {
                        year_array1[0] = debt.rows[arr_number].values[y];
                        year_array1_usd[0] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = debt.rows[arr_number].eurValues[y];
                        year_array2[0] = debt2.rows[arr_number].values[y];
                        year_array2_usd[0] = debt2.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = debt2.rows[arr_number].eurValues[y];
                    }
                }

                //

                if (
                    debt.periods[y].relatingPeriod != 0 &&
                    debt.periods[y].relatingPeriod == 2
                ) {
                    if (debt.periods[y].relatingYear == y1) {
                        year_array1[1] = debt.rows[arr_number].values[y];
                        year_array1_usd[1] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[1] = debt.rows[arr_number].eurValues[y];
                        year_array2[1] = debt2.rows[arr_number].values[y];
                        year_array2_usd[1] = debt2.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = debt2.rows[arr_number].eurValues[y];
                    }
                }
                if (
                    debt.periods[y].relatingPeriod == 0 &&
                    debt.periods[y].month == "6"
                ) {
                    if (debt.periods[y].year == y1) {
                        year_array1[1] = debt.rows[arr_number].values[y];
                        year_array1_usd[1] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[1] = debt.rows[arr_number].eurValues[y];
                        year_array2[1] = debt2.rows[arr_number].values[y];
                        year_array2_usd[1] = debt2.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = debt2.rows[arr_number].eurValues[y];
                    }
                }

                //

                if (
                    debt.periods[y].relatingPeriod != 0 &&
                    debt.periods[y].relatingPeriod == 3
                ) {
                    if (debt.periods[y].relatingYear == y1) {
                        year_array1[2] = debt.rows[arr_number].values[y];
                        year_array1_usd[2] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = debt.rows[arr_number].eurValues[y];
                        year_array2[2] = debt2.rows[arr_number].values[y];
                        year_array2_usd[2] = debt2.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = debt2.rows[arr_number].eurValues[y];
                    }
                } else if (
                    debt.periods[y].relatingPeriod == 0 &&
                    debt.periods[y].month == "9"
                ) {
                    if (debt.periods[y].year == y1) {
                        year_array1[2] = debt.rows[arr_number].values[y];
                        year_array1_usd[2] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = debt.rows[arr_number].eurValues[y];
                        year_array2[2] = debt2.rows[arr_number].values[y];
                        year_array2_usd[2] = debt2.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = debt2.rows[arr_number].eurValues[y];
                    }
                }

                //
                if (
                    debt.periods[y].relatingPeriod != 0 &&
                    debt.periods[y].relatingPeriod == 4
                ) {
                    if (debt.periods[y].relatingYear == y1) {
                        year_array1[3] = debt.rows[arr_number].values[y];
                        year_array1_usd[3] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[3] = debt.rows[arr_number].eurValues[y];
                        year_array2[3] = debt2.rows[arr_number].values[y];
                        year_array2_usd[3] = debt2.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = debt2.rows[arr_number].eurValues[y];
                    }
                } else if (
                    debt.periods[y].relatingPeriod == 0 &&
                    debt.periods[y].month == "12"
                ) {
                    if (debt.periods[y].year == y1) {
                        year_array1[3] = debt.rows[arr_number].values[y];
                        year_array1_usd[3] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[3] = debt.rows[arr_number].eurValues[y];
                        year_array2[3] = debt2.rows[arr_number].values[y];
                        year_array2_usd[3] = debt2.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = debt2.rows[arr_number].eurValues[y];
                    }
                }
            }
        }
    }

    const basicData = {
        labels: ['1.Çeyrek', '2.Çeyrek', '3.Çeyrek', '4.Çeyrek'],
        datasets: [
            {
                backgroundColor: ['#114BE0', '#00968D', '#554570', '#685ABC', '#A2A0A9'],
                datalabels: {
                    align: 'end',
                    anchor: 'end'
                },
                borderRadius: 10,
                data: [year_array1[0], year_array1[1], year_array1[2], year_array1[3]],
            },
            {
                backgroundColor: ['#114BE0', '#00968D', '#554570', '#685ABC', '#A2A0A9'],
                datalabels: {
                    align: 'end',
                    anchor: 'end'
                },
                borderRadius: 10,
                data: [year_array2[0], year_array2[1], year_array2[2], year_array2[3]],
            }
        ]
    };

    const compNames = []
    compNames[0] = code;
    compNames[1] = code2;

    const horizontalOptions = {
        maintainAspectRatio: false,
        aspectRatio: 1.3,
        barPercentage: 0.8,
        plugins: {
            legend: {
                position: 'bottom',
                display: false
            },
            datalabels: {
                color: 'black',
                backgroundColor: '#FCFCFC',
                borderRadius: 7,
                offset: 1,
                rotation: -90,
                labels: {
                    name: {
                        align: 'bottom',
                        font: { size: 13 },
                        formatter: function (value, ctx) {
                            return compNames[ctx.datasetIndex];
                        }
                    },
                    display: true,
                },
                font: {
                    weight: 'bold',
                    size: 0
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#FCFCFC'
                },
                grid: {
                    display: false,
                }
            },
            y: {
                ticks: {
                    callback: function (value) {
                        return thousandFormat(value);
                    },
                    color: '#FCFCFC'
                },
                grid: {
                    color: '#302F2F'
                }
            }
        }
    };

    return (<>
        <Dropdown options={years} value={activeYear} onChange={(e) => setActiveYear(e.value)}></Dropdown>
        <div className="custom-card" key={uuidv4()} style={{ marginTop: '10px', padding: '3%' }}>
            <Chart id={uuidv4()} type="bar" style={{ width: '80%', marginLeft: '5%', marginTop: '1%' }} plugins={[ChartDataLabels]} data={basicData} options={horizontalOptions} />
        </div>
        <div className="custom-card" key={uuidv4()} style={{ marginTop: '10px', padding: '2%' }}>
            <div className="p-grid" >
                <div className="p-col-12" >
                    <Button onClick={() => setActiveIndex(0)} className="p-button-text" label="₺" />
                    <Button onClick={() => setActiveIndex(1)} className="p-button-text" label="$" />
                    <Button onClick={() => setActiveIndex(2)} className="p-button-text" label="€" />
                </div>
                <div className="p-col-6" >
                    <IncomeTabTable data={activeIndex == 0 ? year_array1 : activeIndex == 1 ? year_array1_usd : year_array1_eur}
                        data2={activeIndex == 0 ? year_array2 : activeIndex == 1 ? year_array2_usd : year_array2_eur} />
                </div>
            </div>
        </div>
    </>)
}

export const IncomeTabTable = ({ data, data2 }) => {
    return (
        <>
            <p style={{ marginTop: '10%' }}>1.Çeyrek</p>
            <label style={{ color: '#B3B1FF' }}>{data[0] ? data[0].toLocaleString("tr-TR") : "-"}</label>
            <label>vs</label>
            <label style={{ color: '#E4CB44' }}>{data2[0] ? data2[0].toLocaleString("tr-TR") : "-"}</label>

            <p style={{ marginTop: '10%' }}>2.Çeyrek</p>
            <label style={{ color: '#B3B1FF' }}>{data[1] ? data[1].toLocaleString("tr-TR") : "-"}</label>
            <label>vs</label>
            <label style={{ color: '#E4CB44' }}>{data2[1] ? data2[1].toLocaleString("tr-TR") : "-"}</label>

            <p style={{ marginTop: '10%' }}>3.Çeyrek</p>
            <label style={{ color: '#B3B1FF' }}>{data[2] ? data[2].toLocaleString("tr-TR") : "-"}</label>
            <label>vs</label>
            <label style={{ color: '#E4CB44' }}>{data2[2] ? data2[2].toLocaleString("tr-TR") : "-"}</label>

            <p style={{ marginTop: '10%' }}>4.Çeyrek</p>
            <label style={{ color: '#B3B1FF' }}>{data[3] ? data[3].toLocaleString("tr-TR") : "-"}</label>
            <label>vs</label>
            <label style={{ color: '#E4CB44' }}>{data2[3] ? data2[3].toLocaleString("tr-TR") : "-"}</label>
        </>
    )
}