//当日天气
async function weather_now()
{
    //let location = 101010100;
    //let l = "location" + location;
    let res = await fetch("https://api.qweather.com/v7/weather/now?key=fa655f993c2246009b6df5a7ee8016bf&location=101010100");
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
weather_now();
//未来7天连续天气
async function weather_seven()
{
//获取历史天气
    let r = await fetch("https://datasetapi.qweather.com/v7/historical/weather?date=20220115&key=fa655f993c2246009b6df5a7ee8016bf&location=101010100");
    let rt = await r.json();
    s_text.innerHTML = rt.weatherHourly[0].text;
    let icon = 'qi-' + rt.weatherHourly[0].icon;
            icon_s.className = icon;
        
            let res = await fetch("https://api.qweather.com/v7/weather/7d?key=fa655f993c2246009b6df5a7ee8016bf&location=101010100");
            let ret = await res.json();
            console.log(ret);
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
            //填入从今天开始5天天气文字描述
            let t_text = document.querySelectorAll('span [id="t_text"]');
            let b_text = document.querySelectorAll('span [id="b_text"]');
            for(let i = 0; i < t_text.length; i++)
            {
                t_text[i].innerHTML = ret.daily[i].textDay;
                b_text[i].innerHTML = ret.daily[i].textNight;
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
            //今天及未来四天的最低温天气
            let t0_ = ret.daily[0].tempMin, t1_ = ret.daily[1].tempMin, t2_ = ret.daily[2].tempMin, t3_ = ret.daily[3].tempMin, t4_ = ret.daily[4].tempMin;
            //前一天天气
            let t_1_ = rt.weatherDaily.tempMin;

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
                data: [parseInt(t_1_), parseInt(t0_), parseInt(t1_), parseInt(t2_), parseInt(t3_), parseInt(t4_)],
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
        }
        weather_seven();
        
        async function weather_condi()
        {
            let res = await fetch("https://api.qweather.com/v7/indices/1d?key=fa655f993c2246009b6df5a7ee8016bf&location=101010100&type=0");
            let ret = await res.json();
            console.log(ret);
            text.innerHTML = ret.daily[2].text;
        }
        weather_condi();
        //空气质量
        async function aircondition()
        {
            let res = await fetch("https://api.qweather.com/v7/air/5d?key=fa655f993c2246009b6df5a7ee8016bf&location=101010100");
            let ret = await res.json();
            console.log(ret);
            let tod_aqi = ret.daily[0].aqi;
            let tod_category = ret.daily[0].category;
            aircondition_text.innerHTML = tod_aqi + ' ' + tod_category;
            tod_condi.innerHTML = tod_category;
            let tom_category = ret.daily[0].category;
            tom_condi.innerHTML = tom_category;
        }
        aircondition();
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