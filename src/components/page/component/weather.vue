<template>
    <div class="weather">
        <div class="child" flex style="margin-top: -5px">
            <img :src="imgUrl || defaultImgUrl" style="width: 0.44rem; height: 0.44rem" />

            <div style="margin: -5px 0 0 11px">
                <div class="temperature" style="height: 0.15rem; text-align: center">{{ temperature || defaultTemperature }}°C</div>
                <div class="word" style="text-align: center">{{ weather || defaultWeather }}</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Weather',
    props: ['city'],
    data() {
        return {
            weather: '',
            temperature: '',
            imgUrl: '',
            defaultWeather: '晴',
            defaultTemperature: '28',
            defaultImgUrl: require('../../../assets/weather/weather01.png'),
            weatherList: [
                { id: 1, name: '晴', url: require('../../../assets/weather/weather01.png') },
                { id: 2, name: '少云', url: require('../../../assets/weather/weather02.png') },
                { id: 3, name: '晴间多云', url: require('../../../assets/weather/weather03.png') },
                { id: 4, name: '多云', url: require('../../../assets/weather/weather04.png') },
                { id: 5, name: '阴', url: require('../../../assets/weather/weather05.png') },
                { id: 6, name: '有风', url: require('../../../assets/weather/weather06.png') },
                { id: 7, name: '平静', url: require('../../../assets/weather/weather07.png') },
                { id: 8, name: '微风', url: require('../../../assets/weather/weather08.png') },
                { id: 9, name: '和风', url: require('../../../assets/weather/weather09.png') },
                { id: 10, name: '清风', url: require('../../../assets/weather/weather10.png') },
                { id: 11, name: '强风/劲风', url: require('../../../assets/weather/weather11.png') },
                { id: 12, name: '疾风', url: require('../../../assets/weather/weather12.png') },
                { id: 13, name: '大风', url: require('../../../assets/weather/weather13.png') },
                { id: 14, name: '烈风', url: require('../../../assets/weather/weather14.png') },
                { id: 15, name: '风暴', url: require('../../../assets/weather/weather15.png') },
                { id: 16, name: '狂爆风', url: require('../../../assets/weather/weather16.png') },
                { id: 17, name: '飓风', url: require('../../../assets/weather/weather17.png') },
                { id: 18, name: '热带风暴', url: require('../../../assets/weather/weather18.png') },
                { id: 19, name: '霾', url: require('../../../assets/weather/weather19.png') },
                { id: 20, name: '中度霾', url: require('../../../assets/weather/weather20.png') },
                { id: 21, name: '重度霾', url: require('../../../assets/weather/weather21.png') },
                { id: 22, name: '严重霾', url: require('../../../assets/weather/weather22.png') },
                { id: 23, name: '阵雨', url: require('../../../assets/weather/weather23.png') },
                { id: 24, name: '雷阵雨', url: require('../../../assets/weather/weather24.png') },
                { id: 25, name: '雷阵雨并伴有冰雹', url: require('../../../assets/weather/weather25.png') },
                { id: 26, name: '小雨', url: require('../../../assets/weather/weather26.png') },
                { id: 27, name: '中雨', url: require('../../../assets/weather/weather27.png') },
                { id: 28, name: '大雨', url: require('../../../assets/weather/weather28.png') },
                { id: 29, name: '暴雨', url: require('../../../assets/weather/weather29.png') },
                { id: 30, name: '大暴雨', url: require('../../../assets/weather/weather30.png') },
                { id: 31, name: '特大暴雨', url: require('../../../assets/weather/weather31.png') },
                { id: 32, name: '强阵雨', url: require('../../../assets/weather/weather32.png') },
                { id: 33, name: '强雷阵雨', url: require('../../../assets/weather/weather33.png') },
                { id: 34, name: '极端降雨', url: require('../../../assets/weather/weather34.png') },
                { id: 35, name: '毛毛雨/细雨', url: require('../../../assets/weather/weather35.png') },
                { id: 36, name: '雨', url: require('../../../assets/weather/weather36.png') },
                { id: 37, name: '小雨-中雨', url: require('../../../assets/weather/weather37.png') },
                { id: 38, name: '中雨-大雨', url: require('../../../assets/weather/weather38.png') },
                { id: 39, name: '大雨-暴雨', url: require('../../../assets/weather/weather39.png') },
                { id: 40, name: '暴雨-大暴雨', url: require('../../../assets/weather/weather40.png') },
                { id: 41, name: '大暴雨-特大暴雨', url: require('../../../assets/weather/weather41.png') },
                { id: 42, name: '雨雪天气', url: require('../../../assets/weather/weather42.png') },
                { id: 43, name: '雨夹雪', url: require('../../../assets/weather/weather43.png') },
                { id: 44, name: '阵雨夹雪', url: require('../../../assets/weather/weather44.png') },
                { id: 45, name: '冻雨', url: require('../../../assets/weather/weather45.png') },
                { id: 46, name: '雪', url: require('../../../assets/weather/weather46.png') },
                { id: 47, name: '阵雪', url: require('../../../assets/weather/weather47.png') },
                { id: 48, name: '小雪', url: require('../../../assets/weather/weather48.png') },
                { id: 49, name: '中雪', url: require('../../../assets/weather/weather49.png') },
                { id: 50, name: '大雪', url: require('../../../assets/weather/weather50.png') },
                { id: 51, name: '暴雪', url: require('../../../assets/weather/weather51.png') },
                { id: 52, name: '小雪-中雪', url: require('../../../assets/weather/weather52.png') },
                { id: 53, name: '中雪-大雪', url: require('../../../assets/weather/weather53.png') },
                { id: 54, name: '大雪-暴雪', url: require('../../../assets/weather/weather54.png') },
                { id: 55, name: '浮尘', url: require('../../../assets/weather/weather55.png') },
                { id: 56, name: '扬沙', url: require('../../../assets/weather/weather56.png') },
                { id: 57, name: '沙尘暴', url: require('../../../assets/weather/weather57.png') },
                { id: 58, name: '强沙尘暴', url: require('../../../assets/weather/weather58.png') },
                { id: 59, name: '龙卷风', url: require('../../../assets/weather/weather59.png') },
                { id: 60, name: '雾', url: require('../../../assets/weather/weather60.png') },
                { id: 61, name: '浓雾', url: require('../../../assets/weather/weather61.png') },
                { id: 62, name: '强浓雾', url: require('../../../assets/weather/weather62.png') },
                { id: 63, name: '轻雾', url: require('../../../assets/weather/weather63.png') },
                { id: 64, name: '大雾', url: require('../../../assets/weather/weather64.png') },
                { id: 65, name: '特强浓雾', url: require('../../../assets/weather/weather65.png') },
                { id: 66, name: '热', url: require('../../../assets/weather/weather66.png') },
                { id: 67, name: '冷', url: require('../../../assets/weather/weather67.png') },
                { id: 68, name: '未知', url: require('../../../assets/weather/weather68.png') }
            ]
        };
    },
    mounted() {
        this.getAddress();
    },
    methods: {
        getAddress() {
            const that = this;
            // eslint-disable-next-line no-undef
            AMap.plugin('AMap.CitySearch', function () {
                // eslint-disable-next-line no-undef
                var citySearch = new AMap.CitySearch();
                citySearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        // eslint-disable-next-line no-undef
                        AMap.plugin('AMap.Weather', function () {
                            // eslint-disable-next-line no-undef
                            var weather = new AMap.Weather();

                            // 执行实时天气信息查询
                            // eslint-disable-next-line handle-callback-err
                            weather.getLive(result.city, function (err, data) {
                                that.weather = data.weather;
                                that.temperature = data.temperature;
                                for (let i = 0; i < that.weatherList.length; i++) {
                                    if (that.weatherList[i].name === data.weather) {
                                        that.imgUrl = that.weatherList[i].url;
                                        break;
                                    }
                                }
                                // console.log(data)
                            });
                        });
                    }
                });
            });
        }
    }
};
</script>


