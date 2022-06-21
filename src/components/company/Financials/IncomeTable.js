import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import { thousandFormat } from '../../../helpers/common';
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
        quarter,
        year,
        category,
        arr_number,
        periods,
        financials,
        trends,
        debt,
        wc,
        balance,
    } = prop

    const [activeIndex, setActiveIndex] = useState(0);
    const category_year = (trends.mainTrends[category].annual * 100).toFixed(2);
    const category_quarter = (trends.mainTrends[category].quarter * 100).toFixed(2);
    const main_year = (trends.categoryTrends[year].item2 * 100).toFixed(2);
    const main_quarter = (trends.categoryTrends[quarter].item2 * 100).toFixed(2);
    const this_period = comp[0].value;
    const pre_period = comp[1].value;
    const this_quarter = periods.periods[0].year + "/" + periods.periods[0].month;
    const pre_quarter = periods.periods[1].year + "/" + periods.periods[1].month;

    var y1 = 0,
        y2 = 0,
        y3 = 0;

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

    y1 = Math.max(...yearArray);
    y2 = y1 - 1;
    y3 = y2 - 1;
    var year_array1 = [0, 0, 0, 0]; // son sene
    var year_array2 = [0, 0, 0, 0]; // orta sene
    var year_array3 = [0, 0, 0, 0]; // ilk sene
    var year_array1_usd = [0, 0, 0, 0]; // son sene
    var year_array2_usd = [0, 0, 0, 0]; // orta sene
    var year_array3_usd = [0, 0, 0, 0]; // ilk sene
    var year_array1_eur = [0, 0, 0, 0]; // son sene
    var year_array2_eur = [0, 0, 0, 0]; // orta sene
    var year_array3_eur = [0, 0, 0, 0]; // ilk sene
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
                    }
                    if (financials.periods[y].year == y2) {
                        year_array2[0] = financials.rows[arr_number].values[y];
                        year_array2_usd[0] = financials.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].year == y3) {
                        year_array3[0] = financials.rows[arr_number].values[y];
                        year_array3_usd[0] = financials.rows[arr_number].usdValues[y];
                        year_array3_eur[0] = financials.rows[arr_number].eurValues[y];
                    }
                } else if (
                    financials.periods[y].relatingPeriod == 0 &&
                    financials.periods[y].month == "3"
                ) {
                    if (financials.periods[y].year == y1) {
                        year_array1[0] = financials.rows[arr_number].values[y];
                        year_array1_usd[0] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].year == y2) {
                        year_array2[0] = financials.rows[arr_number].values[y];
                        year_array2_usd[0] = financials.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].year == y3) {
                        year_array3[0] = financials.rows[arr_number].values[y];
                        year_array3_usd[0] = financials.rows[arr_number].usdValues[y];
                        year_array3_eur[0] = financials.rows[arr_number].eurValues[y];
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
                    }
                    if (financials.periods[y].relatingYear == y2) {
                        year_array2[1] = financials.rows[arr_number].values[y];
                        year_array2_usd[1] = financials.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].relatingYear == y3) {
                        year_array3[1] = financials.rows[arr_number].values[y];
                        year_array3_usd[1] = financials.rows[arr_number].usdValues[y];
                        year_array3_eur[1] = financials.rows[arr_number].eurValues[y];
                    }
                } else if (
                    financials.periods[y].relatingPeriod == 0 &&
                    financials.periods[y].month == "6"
                ) {
                    if (financials.periods[y].year == y1) {
                        year_array1[1] = financials.rows[arr_number].values[y];
                        year_array1_usd[1] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[1] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].year == y2) {
                        year_array2[1] = financials.rows[arr_number].values[y];
                        year_array2_usd[1] = financials.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].year == y3) {
                        year_array3[1] = financials.rows[arr_number].values[y];
                        year_array3_usd[1] = financials.rows[arr_number].usdValues[y];
                        year_array3_eur[1] = financials.rows[arr_number].eurValues[y];
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
                    }
                    if (financials.periods[y].relatingYear == y2) {
                        year_array2[2] = financials.rows[arr_number].values[y];
                        year_array2_usd[2] = financials.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].relatingYear == y3) {
                        year_array3[2] = financials.rows[arr_number].values[y];
                        year_array3_usd[2] = financials.rows[arr_number].usdValues[y];
                        year_array3_eur[2] = financials.rows[arr_number].eurValues[y];
                    }
                } else if (
                    financials.periods[y].relatingPeriod == 0 &&
                    financials.periods[y].month == "9"
                ) {
                    if (financials.periods[y].year == y1) {
                        year_array1[2] = financials.rows[arr_number].values[y];
                        year_array1_usd[2] = financials.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].year == y2) {
                        year_array2[2] = financials.rows[arr_number].values[y];
                        year_array2_usd[2] = financials.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].year == y3) {
                        year_array3[2] = financials.rows[arr_number].values[y];
                        year_array3_usd[2] = financials.rows[arr_number].usdValues[y];
                        year_array3_eur[2] = financials.rows[arr_number].eurValues[y];
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
                    }
                    if (financials.periods[y].relatingYear == y2) {
                        year_array2[3] = financials.rows[arr_number].values[y];
                        year_array2_usd[3] = financials.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].relatingYear == y3) {
                        year_array3[3] = financials.rows[arr_number].values[y];
                        year_array3_usd[3] = financials.rows[arr_number].usdValues[y];
                        year_array3_eur[3] = financials.rows[arr_number].eurValues[y];
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
                    }
                    if (financials.periods[y].year == y2) {
                        year_array2[3] = financials.rows[arr_number].values[y];
                        year_array2_usd[3] = financials.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = financials.rows[arr_number].eurValues[y];
                    }
                    if (financials.periods[y].year == y3) {
                        year_array3[3] = financials.rows[arr_number].values[y];
                        year_array3_usd[3] = financials.rows[arr_number].usdValues[y];
                        year_array3_eur[3] = financials.rows[arr_number].eurValues[y];
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
                            }
                            if (financials.periods[y].relatingYear == y2) {
                                year_array2[0] = balance.rows[x].values[y];
                                year_array2_usd[0] = balance.rows[x].usdValues[y];
                                year_array2_eur[0] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].relatingYear == y3) {
                                year_array3[0] = balance.rows[x].values[y];
                                year_array3_usd[0] = balance.rows[x].usdValues[y];
                                year_array3_eur[0] = balance.rows[x].eurValues[y];
                            }
                        } else if (
                            financials.periods[y].relatingPeriod == 0 &&
                            financials.periods[y].month == "3"
                        ) {
                            if (financials.periods[y].year == y1) {
                                year_array1[0] = balance.rows[x].values[y];
                                year_array1_usd[0] = balance.rows[x].usdValues[y];
                                year_array1_eur[0] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].year == y2) {
                                year_array2[0] = balance.rows[x].values[y];
                                year_array2_usd[0] = balance.rows[x].usdValues[y];
                                year_array2_eur[0] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].year == y3) {
                                year_array3[0] = balance.rows[x].values[y];
                                year_array3_usd[0] = balance.rows[x].usdValues[y];
                                year_array3_eur[0] = balance.rows[x].eurValues[y];
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
                            }
                            if (financials.periods[y].relatingYear == y2) {
                                year_array2[1] = balance.rows[x].values[y];
                                year_array2_usd[1] = balance.rows[x].usdValues[y];
                                year_array2_eur[1] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].relatingYear == y3) {
                                year_array3[1] = balance.rows[x].values[y];
                                year_array3_usd[1] = balance.rows[x].usdValues[y];
                                year_array3_eur[1] = balance.rows[x].eurValues[y];
                            }
                        } else if (
                            financials.periods[y].relatingPeriod == 0 &&
                            financials.periods[y].month == "6"
                        ) {
                            if (financials.periods[y].year == y1) {
                                year_array1[1] = balance.rows[x].values[y];
                                year_array1_usd[1] = balance.rows[x].usdValues[y];
                                year_array1_eur[1] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].year == y2) {
                                year_array2[1] = balance.rows[x].values[y];
                                year_array2_usd[1] = balance.rows[x].usdValues[y];
                                year_array2_eur[1] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].year == y3) {
                                year_array3[1] = balance.rows[x].values[y];
                                year_array3_usd[1] = balance.rows[x].usdValues[y];
                                year_array3_eur[1] = balance.rows[x].eurValues[y];
                            }
                        }

                        //

                        if (
                            financials.periods[y].relatingPeriod != 0 &&
                            financials.periods[y].relatingPeriod == 3
                        ) {
                            if (financials.periods[y].relatingYear == y1) {
                                year_array1[2] = balance.rows[x].values[y];
                                year_array1_usd[2] = balance.rows[x].usdValues[y];
                                year_array1_eur[2] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].relatingYear == y2) {
                                year_array2[2] = balance.rows[x].values[y];
                                year_array2_usd[2] = balance.rows[x].usdValues[y];
                                year_array2_eur[2] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].relatingYear == y3) {
                                year_array3[2] = balance.rows[x].values[y];
                                year_array3_usd[2] = balance.rows[x].usdValues[y];
                                year_array3_eur[2] = balance.rows[x].eurValues[y];
                            }
                        } else if (
                            financials.periods[y].relatingPeriod == 0 &&
                            financials.periods[y].month == "9"
                        ) {
                            if (financials.periods[y].year == y1) {
                                year_array1[2] = balance.rows[x].values[y];
                                year_array1_usd[2] = balance.rows[x].usdValues[y];
                                year_array1_eur[2] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].year == y2) {
                                year_array2[2] = balance.rows[x].values[y];
                                year_array2_usd[2] = balance.rows[x].usdValues[y];
                                year_array2_eur[2] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].year == y3) {
                                year_array3[2] = balance.rows[x].values[y];
                                year_array3_usd[2] = balance.rows[x].usdValues[y];
                                year_array3_eur[2] = balance.rows[x].eurValues[y];
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
                            }
                            if (financials.periods[y].relatingYear == y2) {
                                year_array2[3] = balance.rows[x].values[y];
                                year_array2_usd[3] = balance.rows[x].usdValues[y];
                                year_array2_eur[3] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].relatingYear == y3) {
                                year_array3[3] = balance.rows[x].values[y];
                                year_array3_usd[3] = balance.rows[x].usdValues[y];
                                year_array3_eur[3] = balance.rows[x].eurValues[y];
                            }
                        } else if (
                            financials.periods[y].relatingPeriod == 0 &&
                            financials.periods[y].month == "12"
                        ) {
                            if (financials.periods[y].year == y1) {
                                year_array1[3] = balance.rows[x].values[y];
                                year_array1_usd[3] = balance.rows[x].usdValues[y];
                                year_array1_eur[3] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].year == y2) {
                                year_array2[3] = balance.rows[x].values[y];
                                year_array2_usd[3] = balance.rows[x].usdValues[y];
                                year_array2_eur[3] = balance.rows[x].eurValues[y];
                            }
                            if (financials.periods[y].year == y3) {
                                year_array3[3] = balance.rows[x].values[y];
                                year_array3_usd[3] = balance.rows[x].usdValues[y];
                                year_array3_eur[3] = balance.rows[x].eurValues[y];
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
                    }
                    if (wc.periods[y].relatingYear == y2) {
                        year_array2[0] = wc.rows[arr_number].values[y];
                        year_array2_usd[0] = wc.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].relatingYear == y3) {
                        year_array3[0] = wc.rows[arr_number].values[y];
                        year_array3_usd[0] = wc.rows[arr_number].usdValues[y];
                        year_array3_eur[0] = wc.rows[arr_number].eurValues[y];
                    }
                } else if (
                    wc.periods[y].relatingPeriod == 0 &&
                    wc.periods[y].month == "3"
                ) {
                    if (wc.periods[y].year == y1) {
                        year_array1[0] = wc.rows[arr_number].values[y];
                        year_array1_usd[0] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].year == y2) {
                        year_array2[0] = wc.rows[arr_number].values[y];
                        year_array2_usd[0] = wc.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].year == y3) {
                        year_array3[0] = wc.rows[arr_number].values[y];
                        year_array3_usd[0] = wc.rows[arr_number].usdValues[y];
                        year_array3_eur[0] = wc.rows[arr_number].eurValues[y];
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
                    }
                    if (wc.periods[y].relatingYear == y2) {
                        year_array2[1] = wc.rows[arr_number].values[y];
                        year_array2_usd[1] = wc.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].relatingYear == y3) {
                        year_array3[1] = wc.rows[arr_number].values[y];
                        year_array3_usd[1] = wc.rows[arr_number].usdValues[y];
                        year_array3_eur[1] = wc.rows[arr_number].eurValues[y];
                    }
                } else if (
                    wc.periods[y].relatingPeriod == 0 &&
                    wc.periods[y].month == "6"
                ) {
                    if (wc.periods[y].year == y1) {
                        year_array1[1] = wc.rows[arr_number].values[y];
                        year_array1_usd[1] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[1] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].year == y2) {
                        year_array2[1] = wc.rows[arr_number].values[y];
                        year_array2_usd[1] = wc.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].year == y3) {
                        year_array3[1] = wc.rows[arr_number].values[y];
                        year_array3_usd[1] = wc.rows[arr_number].usdValues[y];
                        year_array3_eur[1] = wc.rows[arr_number].eurValues[y];
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
                    }
                    if (wc.periods[y].relatingYear == y2) {
                        year_array2[2] = wc.rows[arr_number].values[y];
                        year_array2_usd[2] = wc.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].relatingYear == y3) {
                        year_array3[2] = wc.rows[arr_number].values[y];
                        year_array3_usd[2] = wc.rows[arr_number].usdValues[y];
                        year_array3_eur[2] = wc.rows[arr_number].eurValues[y];
                    }
                } else if (
                    wc.periods[y].relatingPeriod == 0 &&
                    wc.periods[y].month == "9"
                ) {
                    if (wc.periods[y].year == y1) {
                        year_array1[2] = wc.rows[arr_number].values[y];
                        year_array1_usd[2] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].year == y2) {
                        year_array2[2] = wc.rows[arr_number].values[y];
                        year_array2_usd[2] = wc.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].year == y3) {
                        year_array3[2] = wc.rows[arr_number].values[y];
                        year_array3_usd[2] = wc.rows[arr_number].usdValues[y];
                        year_array3_eur[2] = wc.rows[arr_number].eurValues[y];
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
                    }
                    if (wc.periods[y].relatingYear == y2) {
                        year_array2[3] = wc.rows[arr_number].values[y];
                        year_array2_usd[3] = wc.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].relatingYear == y3) {
                        year_array3[3] = wc.rows[arr_number].values[y];
                        year_array3_usd[3] = wc.rows[arr_number].usdValues[y];
                        year_array3_eur[3] = wc.rows[arr_number].eurValues[y];
                    }
                } else if (
                    wc.periods[y].relatingPeriod == 0 &&
                    wc.periods[y].month == "12"
                ) {
                    if (wc.periods[y].year == y1) {
                        year_array1[3] = wc.rows[arr_number].values[y];
                        year_array1_usd[3] = wc.rows[arr_number].usdValues[y];
                        year_array1_eur[3] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].year == y2) {
                        year_array2[3] = wc.rows[arr_number].values[y];
                        year_array2_usd[3] = wc.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = wc.rows[arr_number].eurValues[y];
                    }
                    if (wc.periods[y].year == y3) {
                        year_array3[3] = wc.rows[arr_number].values[y];
                        year_array3_usd[3] = wc.rows[arr_number].usdValues[y];
                        year_array3_eur[3] = wc.rows[arr_number].eurValues[y];
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
                    }
                    if (debt.periods[y].relatingYear == y2) {
                        year_array2[0] = debt.rows[arr_number].values[y];
                        year_array2_usd[0] = debt.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].relatingYear == y3) {
                        year_array3[0] = debt.rows[arr_number].values[y];
                        year_array3_usd[0] = debt.rows[arr_number].usdValues[y];
                        year_array3_eur[0] = debt.rows[arr_number].eurValues[y];
                    }
                } else if (
                    debt.periods[y].relatingPeriod == 0 &&
                    debt.periods[y].month == "3"
                ) {
                    if (debt.periods[y].year == y1) {
                        year_array1[0] = debt.rows[arr_number].values[y];
                        year_array1_usd[0] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[0] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].year == y2) {
                        year_array2[0] = debt.rows[arr_number].values[y];
                        year_array2_usd[0] = debt.rows[arr_number].usdValues[y];
                        year_array2_eur[0] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].year == y3) {
                        year_array3[0] = debt.rows[arr_number].values[y];
                        year_array3_usd[0] = debt.rows[arr_number].usdValues[y];
                        year_array3_eur[0] = debt.rows[arr_number].eurValues[y];
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
                    }
                    if (debt.periods[y].relatingYear == y2) {
                        year_array2[1] = debt.rows[arr_number].values[y];
                        year_array2_usd[1] = debt.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].relatingYear == y3) {
                        year_array3[1] = debt.rows[arr_number].values[y];
                        year_array3_usd[1] = debt.rows[arr_number].usdValues[y];
                        year_array3_eur[1] = debt.rows[arr_number].eurValues[y];
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
                    }
                    if (debt.periods[y].year == y2) {
                        year_array2[1] = debt.rows[arr_number].values[y];
                        year_array2_usd[1] = debt.rows[arr_number].usdValues[y];
                        year_array2_eur[1] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].year == y3) {
                        year_array3[1] = debt.rows[arr_number].values[y];
                        year_array3_usd[1] = debt.rows[arr_number].usdValues[y];
                        year_array3_eur[1] = debt.rows[arr_number].eurValues[y];
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
                    }
                    if (debt.periods[y].relatingYear == y2) {
                        year_array2[2] = debt.rows[arr_number].values[y];
                        year_array2_usd[2] = debt.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].relatingYear == y3) {
                        year_array3[2] = debt.rows[arr_number].values[y];
                        year_array3_usd[2] = debt.rows[arr_number].usdValues[y];
                        year_array3_eur[2] = debt.rows[arr_number].eurValues[y];
                    }
                } else if (
                    debt.periods[y].relatingPeriod == 0 &&
                    debt.periods[y].month == "9"
                ) {
                    if (debt.periods[y].year == y1) {
                        year_array1[2] = debt.rows[arr_number].values[y];
                        year_array1_usd[2] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[2] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].year == y2) {
                        year_array2[2] = debt.rows[arr_number].values[y];
                        year_array2_usd[2] = debt.rows[arr_number].usdValues[y];
                        year_array2_eur[2] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].year == y3) {
                        year_array3[2] = debt.rows[arr_number].values[y];
                        year_array3_usd[2] = debt.rows[arr_number].usdValues[y];
                        year_array3_eur[2] = debt.rows[arr_number].eurValues[y];
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
                    }
                    if (debt.periods[y].relatingYear == y2) {
                        year_array2[3] = debt.rows[arr_number].values[y];
                        year_array2_usd[3] = debt.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].relatingYear == y3) {
                        year_array3[3] = debt.rows[arr_number].values[y];
                        year_array3_usd[3] = debt.rows[arr_number].usdValues[y];
                        year_array3_eur[3] = debt.rows[arr_number].eurValues[y];
                    }
                } else if (
                    debt.periods[y].relatingPeriod == 0 &&
                    debt.periods[y].month == "12"
                ) {
                    if (debt.periods[y].year == y1) {
                        year_array1[3] = debt.rows[arr_number].values[y];
                        year_array1_usd[3] = debt.rows[arr_number].usdValues[y];
                        year_array1_eur[3] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].year == y2) {
                        year_array2[3] = debt.rows[arr_number].values[y];
                        year_array2_usd[3] = debt.rows[arr_number].usdValues[y];
                        year_array2_eur[3] = debt.rows[arr_number].eurValues[y];
                    }
                    if (debt.periods[y].year == y3) {
                        year_array3[3] = debt.rows[arr_number].values[y];
                        year_array3_usd[3] = debt.rows[arr_number].usdValues[y];
                        year_array3_eur[3] = debt.rows[arr_number].eurValues[y];
                    }
                }
            }
        }
    }

    const basicData = {
        labels: [y3, y2, y1],
        datasets: [
            {
                label: '1.Çeyrek',
                backgroundColor: '#114BE0',
                data: [year_array3[0], year_array2[0], year_array1[0]]
            },
            {
                label: '2.Çeyrek',
                backgroundColor: '#00968D',
                data: [year_array3[1], year_array2[1], year_array1[1]]
            },
            {
                label: '3.Çeyrek',
                backgroundColor: '#554570',
                data: [year_array3[2], year_array2[2], year_array1[2]]
            },
            {
                label: '4.Çeyrek',
                backgroundColor: '#685ABC',
                data: [year_array3[3], year_array2[3], year_array1[3]]
            }
        ]
    };

    const horizontalOptions = {
        maintainAspectRatio: false,
        aspectRatio: 1.3,
        barPercentage: 0.5,
        plugins: {
            legend: {
                position: 'bottom',
                display: true
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
                    callback: function(value) {
                        return thousandFormat(value) ;
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
        <div className="custom-card" key={uuidv4()} style={{ marginTop: '10px', padding: '3%' }}>
            <div className="p-grid" >
                <div className="p-col-4" >
                    <p>Trendler</p>
                    <h5>Çeyreklik Trend</h5>
                    <label>({pre_quarter} vs {this_quarter})</label>
                </div>
                <div className="p-col-4" >
                    <p>Değişim</p>
                    <div className={category_quarter < 0 ? "persent-negative" : "persent-positive"}>
                        <i className={category_quarter < 0 ? "pi pi-angle-down" : "pi pi-angle-up"}></i>{category_quarter}%
                    </div>
                </div>
                <div className="p-col-4" >
                    <p>Sektörel Ortalama</p>
                    <div className="persent">
                        {main_quarter}%
                    </div>
                </div>
                <hr></hr>
                <div className="p-col-4" >
                    <h5>Yıllık Trend</h5>
                    <label>({pre_period} vs {this_period})</label>
                </div>
                <div className="p-col-4" >
                    <div className={category_year < 0 ? "persent-negative" : "persent-positive"}>
                        <i className={category_year < 0 ? "pi pi-angle-down" : "pi pi-angle-up"}></i>{category_year}%
                    </div>
                </div>
                <div className="p-col-4" >
                    <div className="persent">
                        {main_year}%
                    </div>
                </div>
            </div>
        </div>
        <div className="custom-card" key={uuidv4()} style={{ marginTop: '10px', padding: '3%' }}>
            <div className="p-grid" >
                <div className="p-col-12" >
                    <Button onClick={() => setActiveIndex(0)} className="p-button-text" label="₺" />
                    <Button onClick={() => setActiveIndex(1)} className="p-button-text" label="$" />
                    <Button onClick={() => setActiveIndex(2)} className="p-button-text" label="€" />
                </div>
                <div className="p-col-3" >
                    <IncomeTabTable year={y1} data={activeIndex == 0 ? year_array1 : activeIndex == 1 ? year_array1_usd : year_array1_eur} />
                </div>
                <div className="p-col-1 vertical-line"></div>
                <div className="p-col-3" >
                    <IncomeTabTable year={y2} data={activeIndex == 0 ? year_array2 : activeIndex == 1 ? year_array2_usd : year_array2_eur} />
                </div>
                <div className="p-col-1 vertical-line"></div>
                <div className="p-col-3" >
                    <IncomeTabTable year={y3} data={activeIndex == 0 ? year_array3 : activeIndex == 1 ? year_array3_usd : year_array3_eur} />
                </div>
            </div>
        </div>
        <div className="custom-card" key={uuidv4()} style={{ marginTop: '10px', padding: '3%' }}>
            <Chart id={uuidv4()} type="bar" style={{ width: '80%', marginLeft: '5%', marginTop: '1%' }} data={basicData} options={horizontalOptions} />
        </div>
    </>)
}

export const IncomeTabTable = ({ year, data }) => {
    return (
        <>
            <h4 style={{ color: '#2FB26A' }}>{year}</h4>
            <p style={{ marginTop: '10%' }}>1.Çeyrek</p>
            <label>{data[0]
                ? data[0].toLocaleString("tr-TR")
                : "-"}</label>
            <p style={{ marginTop: '10%' }}>2.Çeyrek</p>
            <label>{data[1]
                ? data[1].toLocaleString("tr-TR")
                : "-"}</label>
            <p style={{ marginTop: '10%' }}>3.Çeyrek</p>
            <label>{data[2]
                ? data[2].toLocaleString("tr-TR")
                : "-"}</label>
            <p style={{ marginTop: '10%' }}>4.Çeyrek</p>
            <label>{data[3]
                ? data[3].toLocaleString("tr-TR")
                : "-"}</label>
        </>
    )
}