//移动端适配
function setRem() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 + 'px';
}
setRem();
window.onresize = setRem;
let n = 0;
let loca;
function all(location){
let n = 0;
//当日天气
async function weather_now(location)
{
    let l = "location=" + location;
    url = `https://api.qweather.com/v7/weather/now?key=80056b9841894fc083b455c9268536cd&${l}`;
    console.log(l,url);
    let res = await fetch(url);
    let ret = await res.json();
    console.log(ret);
    C.innerHTML = ret.now.temp;
    yinqingyuxue.innerHTML = ret.now.text;
    let windDir = ret.now.windDir;
    let windScale = ret.now.windScale;
    let humidity = ret.now.humidity;
    wind.innerHTML = windDir + windScale + '级' + ' ' + '湿度'+ humidity + '%';
    //当日天气字体图标
    let icon_now = 'qi-' + ret.now.icon;
    console.log(icon_now);
    iconcloud_tod.className=icon_now;
}
weather_now(location);
//未来24小时天气，画出两个折线图
async function weather_24(location)
{
    let l = "location=" + location;
    console.log(l);
    let res = await fetch(`https://api.qweather.com/v7/weather/24h?key=80056b9841894fc083b455c9268536cd&${l}`);
    let ret = await res.json();
    console.log(ret);
    let t0 = ret.hourly[0].temp, t1 = ret.hourly[1].temp, t2 = ret.hourly[2].temp ,t3 = ret.hourly[3].temp, t4 = ret.hourly[4].temp, t5 = ret.hourly[5].temp, t6 = ret.hourly[6].temp , t7 = ret.hourly[7].temp,  t8 = ret.hourly[8].temp,  t9 = ret.hourly[9].temp,  t10 = ret.hourly[10].temp;
    let t11 = ret.hourly[11].temp, t12 = ret.hourly[12].temp, t13 = ret.hourly[13].temp, t14 = ret.hourly[14].temp, t15 = ret.hourly[15].temp;
    let fxtime = ret.hourly[0].fxTime.slice(11,13);
    //未来24小时天气
    let arr = [parseInt(fxtime),parseInt(fxtime)+1,parseInt(fxtime)+2,parseInt(fxtime)+3,parseInt(fxtime)+4,parseInt(fxtime)+5,parseInt(fxtime)+6,parseInt(fxtime)+7,parseInt(fxtime)+8,parseInt(fxtime)+9,parseInt(fxtime)+10,parseInt(fxtime)+11,parseInt(fxtime)+12,parseInt(fxtime)+13,parseInt(fxtime)+14];
    for(let i = 0; i < 15; i++)
    {
        if(arr[i] >= 24) arr[i]-=24;
    }
    let myChart3 = echarts.init(document.getElementById('chart3'));
    let option3 = {
                xAxis: {
                    data: arr,
                    axisLine:{
                        lineStyle: {
                            color:'white',
                        }
                    },
                    position:'bottom',
                
                },
                yAxis: {
                    show: false,
                },
                series: [
                    {
                        data: [parseInt(t0), parseInt(t1), parseInt(t2), parseInt(t3), parseInt(t4), parseInt(t5),parseInt(t6),parseInt(t7),parseInt(t8),parseInt(t9),parseInt(t10),parseInt(t11),parseInt(t12),parseInt(t13),parseInt(t14),parseInt(t15)],
                        type: 'line',
                        //设置斜线样式
                        lineStyle: {
                            normal: {
                                color:'white',
                                width:0.5,
                                type: 'solid'
                            }
                        },
                        //设置数据点的样式
                        itemStyle: {
                            color: 'white',
                            borderColor: 'white'
                        }
                    }
                ]
            }
            // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option3);

    let w0 = ret.hourly[0].windScale.slice(0,1), w1 = ret.hourly[1].windScale.slice(0,1), w2 = ret.hourly[2].windScale.slice(0,1) ,w3 = ret.hourly[3].windScale.slice(0,1), w4 = ret.hourly[4].windScale.slice(0,1), w5 = ret.hourly[5].windScale.slice(0,1), w6 = ret.hourly[6].windScale.slice(0,1), w7 = ret.hourly[7].windScale.slice(0,1),  w8 = ret.hourly[8].windScale.slice(0,1),  w9 = ret.hourly[9].windScale.slice(0,1),  w10 = ret.hourly[10].windScale.slice(0,1);
    let w11 = ret.hourly[11].windScale.slice(0,1), w12 = ret.hourly[12].windScale.slice(0,1), w13 = ret.hourly[13].windScale.slice(0,1), w14 = ret.hourly[14].windScale.slice(0,1), w15 = ret.hourly[15].windScale.slice(0,1);
    
    let myChart4 = echarts.init(document.getElementById('chart4'));
    let option4 = {
                xAxis: {
                    data: arr,
                    axisLine:{
                        lineStyle: {
                            color:'white',
                        }
                    },
                    position:'bottom',
                },
                yAxis: {
                    show: false,
                },
                series: [
                    {
                        data: [parseInt(w0), parseInt(w1), parseInt(w2), parseInt(w3), parseInt(w4), parseInt(w5),parseInt(w6),parseInt(w7),parseInt(w8),parseInt(w9),parseInt(w10),parseInt(w11),parseInt(w12),parseInt(w13),parseInt(w14),parseInt(w15)],
                        type: 'line',
                        //设置斜线样式
                        lineStyle: {
                            normal: {
                                color:'white',
                                width:1,
                                type: 'solid'
                            }
                        },
                        //设置数据点的样式
                        itemStyle: {
                            color: 'white',
                            borderColor: 'white'
                        }
                    }
                ]
            }
            // 使用刚指定的配置项和数据显示图表。
            myChart4.setOption(option4);
            caidan.onclick =()=>
{
    if(n == 0)
    {
        tempp.style.display = 'block';
        tempp.style.borderBottom = '1px solid #FFFFFF';
        windd.style.display = 'block';
        chart3.style.display = 'block';
        sunset.style.display = 'none';
        caidan.className = 'iconfont icon-caidan_shouqi';
        caidan.style.fontSize = '8px';
        windd.onclick=()=>
        {
            tempp.style.borderBottom = 'none';
            windd.style.borderBottom = '1px solid #FFFFFF';
            chart3.style.display = 'none';
            chart4.style.display = 'block';
        }
        tempp.onclick=()=>
        {
            windd.style.borderBottom = 'none';
            tempp.style.borderBottom = '1px solid #FFFFFF';
            chart3.style.display = 'block';
            chart4.style.display = 'none';
        }
        n = 1;
    }
    else 
    {
        chart3.style.display = 'none';
        chart4.style.display = 'none';
        caidan.style.fontSize = '20px';
        caidan.className = 'iconfont icon-xialacaidan';
        tempp.style.borderBottom = 'none';
        windd.style.borderBottom = 'none';
        tempp.style.display = 'none';
        windd.style.display = 'none';
        sunset.style.display = 'block';
        n = 0;
    } 
}
};
weather_24(location);
//未来7天连续天气
async function weather_seven(location)
{
    let l = "location=" + location;
    //获取7天天气
    let res = await fetch(`https://api.qweather.com/v7/weather/7d?key=80056b9841894fc083b455c9268536cd&${l}`);
    let ret = await res.json();
    console.log(ret);
    //获取今日日期
    let d = ret.daily[0].fxDate;
    //计算昨天的日期
    let yyyymmdd;
    switch(parseInt(d.slice(5,7)))
    {
        case 01:
            {
                if(d.slice(8,10) == 01) 
                {
                    let yyyy = parseInt(d.slice(0,4)) - 1;
                    yyyymmdd = yyyy + '12' + '31';
                    console.log(yyyymmdd);
                }
                else 
                {
                    let dd = parseInt(d.slice(8,10)) - 1;
                    yyyymmdd = d.slice(0,4) + d.slice(5,7) + dd;
                    console.log(yyyymmdd);
                }
            };
            break;
        case 02:
            {
                if(d.slice(8,10) == 01)
                {
                    yyyymmdd = d.slice(0,4) + '1' + '31';
                }
                else
                {
                    let dd = parseInt(d.slice(8,10)) - 1;
                    yyyymmdd = d.slice(0,4) + d.slice(5,7) + dd;
                }
            };
            break;
        case 03:
            {
                if(d.slice(8,10) == 01)
                {
                    if(((d.slice(0,4) % 4 == 0)&&(d.slice(0,4) % 100 != 0))||((d.slice(0,4) % 400)==0))
                    yyyymmdd = d.slice(0,4) + '2' + '29';
                    else yyyymmdd = d.slice(0,4) + '2' + '28';
                }
                else
                {
                    let dd = parseInt(d.slice(8,10)) - 1;
                    let yyyymmdd = d.slice(0,4) + d.slice(5,7) + dd;
                }
            };
            break;
        case 04:
        case 06:
        case 09:
        case 11:
            {
                if(d.slice(8,10) == 01)
                {
                    let mm = parseInt(d.slice(5,7)) - 1;
                    yyyymmdd = d.slice(0,4) + mm + '31';
                }
                else
                {
                    let dd = parseInt(d.slice(8,10)) - 1;
                    yyyymmdd = d.slice(0,4) + d.slice(5,7) + dd;
                }
            };
            break;
        case 05:
        case 07:
        case 08:
        case 10:
        case 12:
            {
                if(d.slice(8,10) == 01)
                {
                    let mm = parseInt(d.slice(5,7)) - 1;
                    yyyymmdd = d.slice(0,4) + mm + '30';
                }
                else
                {
                    let dd = parseInt(d.slice(8,10)) - 1;
                    yyyymmdd = d.slice(0,4) + d.slice(5,7) + dd;
                }
            }
            break;
    };
    console.log(yyyymmdd);
    //获取历史天气
    let r = await fetch(`https://datasetapi.qweather.com/v7/historical/weather?date=${yyyymmdd}&key=80056b9841894fc083b455c9268536cd&${l}`);
    let rt = await r.json();
    //获取历史空气质量
    let response = await fetch(`https://datasetapi.qweather.com/v7/historical/air?date=${yyyymmdd}&key=80056b9841894fc083b455c9268536cd&${l}`);
    let result = await response.json();
    //插入昨天空气质量
    air_b_s.innerHTML = result.airHourly[18].category;
    console.log(result.airHourly[18].category);
    if(result.airHourly[18].category == '轻度污染')  air_b_s.style.backgroundColor = '#F39800';
    else if(result.airHourly[18].category == '优') air_b_s.style.backgroundColor = '#ADCB09';
    else if(result.airHourly[18].category == '中度污染') air_b_s.style.backgroundColor = '#E80018';
    else if(result.airHourly[18].category == '重度污染') air_b_s.style.backgroundColor = '#AC024B';
    else if(result.airHourly[18].category == '严重污染') air_b_s.style.backgroundColor = '#970B18';
    //昨天白天天气字体图标以及文字描述
    console.log(rt);
    s_text.innerHTML = rt.weatherHourly[6].text;
    let icon = 'qi-' + rt.weatherHourly[6].icon;
    icon_s.className = icon;
    //昨天晚上天气字体图标文字描述及风向和风级数
    let icon__b = 'qi-' + rt.weatherHourly[18].icon;
    console.log(icon__b);
    icon_b_s.className = icon__b;
    b_text_s.innerHTML = rt.weatherHourly[18].text;
    wind_b_s.innerHTML = rt.weatherHourly[18].windDir;
    wind_b_level_s.innerHTML = rt.weatherHourly[18].windScale + '级';
            //获取当日最高温，最低温
            let tod_tMax = ret.daily[0].tempMax;
            let tod_tMin = ret.daily[0].tempMin;
            tod_tem.innerHTML = tod_tMin + ' ' + '/' + ' ' + tod_tMax +'°';
            //获取明天最高温，最低温
            let tom_tMax = ret.daily[1].tempMax;
            let tom_tMin = ret.daily[1].tempMin;
            //插入温度
            tom_tem.innerHTML = tom_tMin + ' ' + '/' + ' ' + tom_tMax +'°';
            //插入今日明日文字描述
            tod_text.innerHTML = ret.daily[0].textDay;
            tom_text.innerHTML = ret.daily[1].textDay;
            //日落
            sunset.innerHTML = '日落' + ret.daily[0].sunset; 
            //计算今天是星期几
            let date = ret.daily[0].fxDate;
            let w = week(date);
            //用选择控制填入方框里的星期数
            switch(w) {
                case 0: {
                    s_.innerHTML = '周六';t_.innerHTML = '周日';t_1_.innerHTML = '周一';t_2_.innerHTML = '周二';t_3_.innerHTML = '周三';t_4_.innerHTML = '周四';
                    break;
                }
                case 1: {
                    s_.innerHTML = '周日';t_.innerHTML = '周一';t_1_.innerHTML = '周二';t_2_.innerHTML = '周三';t_3_.innerHTML = '周四';t_4_.innerHTML = '周五';
                    break;
                }
                case 2: {
                    s_.innerHTML = '周一';t_.innerHTML = '周二';t_1_.innerHTML = '周三';t_2_.innerHTML = '周四';t_3_.innerHTML = '周五';t_4_.innerHTML = '周六';
                    break;
                }
                case 3: {
                    s_.innerHTML = '周二';t_.innerHTML = '周三';t_1_.innerHTML = '周四';t_2_.innerHTML = '周五';t_3_.innerHTML = '周六';t_4_.innerHTML = '周日';
                    break;
                }
                case 4: {
                    s_.innerHTML = '周三';t_.innerHTML = '周四';t_1_.innerHTML = '周五';t_2_.innerHTML = '周六';t_3_.innerHTML = '周日';t_4_.innerHTML = '周一';
                    break;
                }
                case 5: {
                    s_.innerHTML = '周四';t_.innerHTML = '周五';t_1_.innerHTML = '周六';t_2_.innerHTML = '周日';t_3_.innerHTML = '周一';t_4_.innerHTML = '周二';
                    break;
                }
                case 6: {
                    s_.innerHTML = '周五';t_.innerHTML = '周六';t_1_.innerHTML = '周日';t_2_.innerHTML = '周一';t_3_.innerHTML = '周二';t_4_.innerHTML = '周三';
                    break;
                }
            }
            //填入从今天开始5天天气文字描述，插入晚间风向和级数。
            let t_text = document.querySelectorAll('span [id="t_text"]');
            let b_text = document.querySelectorAll('span [id="b_text"]');
            for(let i = 0; i < t_text.length; i++)
            {
                t_text[i].innerHTML = ret.daily[i].textDay;
                b_text[i].innerHTML = ret.daily[i].textNight;
                wind_b[i].innerHTML = ret.daily[i].windDirNight;
                wind_b_level[i].innerHTML = ret.daily[i].windSpeedNight + '级';
            }
            //插入明天天气字体图标
            let icon_tom = 'qi-' + ret.daily[1].iconDay;
            iconcloud_tom.className=icon_tom;
            //插入从今天开始5天天气字体图标
            let icon_t = document.querySelectorAll('span [id="icon_t"]');
            let icon_b = document.querySelectorAll('span [id="icon_b"]');
            for(let i = 0;i < icon_t.length; i++)
            {
                let iconday = 'qi-' + ret.daily[i].iconDay;
                icon_t[i].className = iconday;
                let iconnight = 'qi-' + ret.daily[i].iconNight;
                icon_b[i].className = iconnight;
            }
            //画一个从今天开始天气折线图（白天天气）
            //今天及未来四天的最高温天气
            let t0 = ret.daily[0].tempMax, t1 = ret.daily[1].tempMax, t2 = ret.daily[2].tempMax, t3 = ret.daily[3].tempMax, t4 = ret.daily[4].tempMax;
            //前一天天气
            let t_1 = rt.weatherDaily.tempMax;
            // 基于准备好的dom，初始化echarts实例
            let myChart1 = echarts.init(document.getElementById('chart1'));

            // 指定图表的配置项和数据
            let option1 = {
                xAxis: {
                    data: ['A', 'B', 'C', 'D', 'E','F'],
                    show: false
                },
                yAxis: {
                    show: false,
                },
                series: [
                    {
                        data: [parseInt(t_1), parseInt(t0), parseInt(t1), parseInt(t2), parseInt(t3), parseInt(t4)],
                        type: 'line',
                        //设置可见数据
                        label: {
                            show: true,
                            position: 'top',
                            fontSize: 20,
                            color: 'white'   
                        },
                        //设置斜线样式
                        lineStyle: {
                            normal: {
                                color:'white',
                                width:1,
                                type: 'solid'
                            }
                        },
                        //设置数据点的样式
                        itemStyle: {
                            color: 'white',
                            borderColor: 'white'
                        }
                    }
                ]
            }
            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(option1);
            //今天及未来四天的最低温天气折线图
            let t0_ = ret.daily[0].tempMin, t1_ = ret.daily[1].tempMin, t2_ = ret.daily[2].tempMin, t3_ = ret.daily[3].tempMin, t4_ = ret.daily[4].tempMin;
            //前一天天气
            let t_11 = rt.weatherDaily.tempMin;

            // 基于准备好的dom，初始化echarts实例
            let myChart2 = echarts.init(document.getElementById('chart2'));

            // 指定图表的配置项和数据
            let option2 = {
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E','F'],
                show: false
            },
            yAxis: {
                show: false,
            },
            series: [
            {
                data: [parseInt(t_11), parseInt(t0_), parseInt(t1_), parseInt(t2_), parseInt(t3_), parseInt(t4_)],
                type: 'line',
                //设置可见数据
                label: {
                    show: true,
                    position: 'bottom',
                    fontSize: 20,
                    color: 'white'   
            },
            //设置斜线样式
            lineStyle: {
                normal: {
                    color:'white',
                    width:1,
                    type: 'solid'
                }
            },
            //设置数据点的样式
            itemStyle: {
                color: 'white',
                borderColor: 'white'
            }
        }
    ]
}
// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);
//适配布局图表
window.onresize = function() {
    myChart1.resize();
    myChart2.resize();
};
}
weather_seven(location);
        
        async function weather_condi(location)
        {
            let l = "location=" + location;
            let res = await fetch(`https://api.qweather.com/v7/indices/1d?key=80056b9841894fc083b455c9268536cd&${l}&type=0`);
            let ret = await res.json();
            console.log(ret);
            text.innerHTML = ret.daily[2].text;
        }
        weather_condi(location);
        //空气质量
        async function aircondition(location)
        {
            let l = "location=" + location;
            let res = await fetch(`https://api.qweather.com/v7/air/5d?key=80056b9841894fc083b455c9268536cd&${l}`);
            let ret = await res.json();
            console.log(ret);
            let tod_aqi = ret.daily[0].aqi;
            let tod_category = ret.daily[0].category;
            if(ret.daily[0].category == '轻度污染')  
            {tod_condi.style.backgroundColor = '#F39800';iconkongqi.style.backgroundColor = '#F39800';}
            else if(ret.daily[0].category == '优') 
            {tod_condi.style.backgroundColor = '#ADCB09';iconkongqi.style.backgroundColor = '#ADCB09';}
            else if(ret.daily[0].category == '中度污染') 
            {tod_condi.style.backgroundColor = '#E80018';iconkongqi.style.backgroundColor = '#E80018';}
            else if(ret.daily[0].category == '重度污染') 
            {tod_condi.style.backgroundColor = '#AC024B';iconkongqi.style.backgroundColor = '#AC024B';}
            else if(ret.daily[0].category == '严重污染') 
            {tod_condi.style.backgroundColor = '#970B18';iconkongqi.style.backgroundColor = '#970B18';};
            aircondition_text.innerHTML = tod_aqi + ' ' + tod_category.slice(0,2);
            tod_condi.innerHTML = tod_category.slice(0,2);
            let tom_category = ret.daily[1].category;
            tom_condi.innerHTML = tom_category.slice(0,2);
            if(ret.daily[1].category == '轻度污染')  tom_condi.style.backgroundColor = '#F39800';
            else if(ret.daily[1].category == '优') tom_condi.style.backgroundColor = '#ADCB09';
            else if(ret.daily[1].category == '中度污染') tom_condi.style.backgroundColor = '#E80018';
            else if(ret.daily[1].category == '重度污染') tom_condi.style.backgroundColor = '#AC024B';
            else if(ret.daily[1].category == '严重污染') tom_condi.style.backgroundColor = '#970B18';
            //插入从今天开始未来5天空气质量
            let airc = document.querySelectorAll('span [id="air_b"]');
            for(let i = 0; i < 5; i++ )
            {
                airc[i].innerHTML = ret.daily[i].category.slice(0,2);
            }
            //设置污染背景颜色
            for(let i = 0; i < 5; i++)
            {
                if(ret.daily[i].category == '轻度污染')  airc[i].style.backgroundColor = '#F39800';
                else if(ret.daily[i].category == '优') airc[i].style.backgroundColor = '#ADCB09';
                else if(ret.daily[i].category == '中度污染') airc[i].style.backgroundColor = '#E80018';
                else if(ret.daily[i].category == '重度污染') airc[i].style.backgroundColor = '#AC024B';
                else if(ret.daily[i].category == '严重污染') airc[i].style.backgroundColor = '#970B18';
            }
        }
        aircondition(location);
            
        //一个计算星期几的函数
        const week=(date)=>
        {
        /*公式中的符号含义如下,w：星期；c：世纪-1；y：年（两位数）；m：月（m大于等于3,小于等于14,即在蔡勒公式中,某年的1、2月要看作上一年的13、14月来计算,比如2003年1月1日要看作2002年的13月1日来计算）；d：日；[ ]代表取整,即只要整数部分.(C是世纪数减一,y是年份后两位,M是月份,d是日数.1月和2月要按上一年的13月和 14月来算,这时C和y均按上一年取值.)
        算出来的W除以7,余数是几就是星期几.如果余数是0,则为星期日.
        以2049年10月1日（100周年国庆）为例,用蔡勒（Zeller）公式进行计算,
        蔡勒（Zeller）公式：w=y+[y/4]+[c/4]-2c+[26(m+1)/10]+d-1
        =49+[49/4]+[20/4]-2×20+[26× (10+1)/10]+1-1
        =49+[12.25]+5-40+[28.6]
        =49+12+5-40+28
        =54 (除以7余5)
        即2049年10月1日（100周年国庆）是星期5.
        不过,以上公式只适合于1582年10月15日之后的情形（当时的罗马教皇将恺撒大帝制订的儒略历修改成格里历,即今天使用的公历）.*/
            year = date.slice(0,4);
            m = parseInt(date.slice(5,7));
            d = parseInt(date.slice(8,10));
            c = parseInt(year.slice(0,2));
            y = parseInt(year.slice(2,4));
            if(m == 01) 
            {
                m = 13;
                y --;
            };
            if(m == 02)
            {
                m = 14;
                y --;
            };
            let w = y + parseInt(y/4) + parseInt(c/4) - 2*c + parseInt((26 * (m + 1)) / 10) + d - 1;
            return w % 7;
        };
    };

