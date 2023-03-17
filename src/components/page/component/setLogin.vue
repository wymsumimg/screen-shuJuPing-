<template>
    <div class="setLoginCom">
        <el-dropdown class="setLogin">
            <span class="el-dropdown-link sl_set"> {{ $t('menu.setCenter') }} <i class="el-icon-setting"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <div @click="helpText()">{{ $t('menu.help') }}</div>
                </el-dropdown-item>
                <el-dropdown-item>
                    <div @click="checkTheme()">{{ $t('menu.themeChange') }}</div>
                </el-dropdown-item>
                <el-dropdown-item>
                    <div @click="editPass()">{{ $t('menu.changePassword') }}</div>
                </el-dropdown-item>
                <el-dropdown-item>
                    <div @click="showMiao()">
                        <span v-if="miao">{{ $t('menu.showMiao') }}</span>
                        <span v-if="!miao">{{ $t('menu.hideMiao') }}</span>
                    </div>
                </el-dropdown-item>
                <el-dropdown-item>
                    <div @click="loginOut()">{{ $t('menu.logOut') }}</div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div class="editPassword">
            <el-dialog :title="$t('menu.changePassword')" :visible.sync="dialogVisible" width="35%">
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
                        <el-form-item :label="$t('menu.originalPassword')" prop="pwd">
                            <el-input v-model="ruleForm.pwd" type="password"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('menu.newPassword')" prop="newpwd">
                            <el-input v-model="ruleForm.newpwd" type="password"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('menu.enterNewAgain')" prop="newpwdAgain">
                            <el-input v-model="ruleForm.newpwdAgain" type="password"></el-input>
                        </el-form-item>
                        <div class="twoBtn">
                            <el-button type="primary" class="savebtnClass" @click="submitForm('ruleForm')">{{ $t('menu.save') }}</el-button>
                            <el-button class="fangqiBtn" @click="dialogVisible = false">{{ $t('menu.abandon') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </el-dialog>
        </div>
        <div class="editPassword">
            <el-dialog :title="$t('menu.themeSelection')" :visible.sync="themeDio" width="12.4rem">
                <div>
                    <el-radio-group
                        v-model="themeStatus"
                        @change="changeTheme"
                        flex-wrap
                        flex="main:justify"
                        style="padding: 0 0.45rem 0 0.5rem"
                    >
                        <div class="zt1" v-for="(them, index) in themeList" :key="index">
                            <el-radio :label="them.id">
                                <span class="zhutiText"> {{ them.name }} </span>
                            </el-radio>
                            <div class="ztImg" @click="innerDio(them.url)">
                                <img :src="them.url" alt="" />
                                <div class="ztIcon">
                                    <i class="el-icon-zoom-in"></i>
                                </div>
                            </div>
                        </div>
                    </el-radio-group>
                </div>
            </el-dialog>
        </div>
        <div class="neizhiDio">
            <el-dialog width="14.94rem" :visible.sync="innerVisible">
                <img :src="themeUrl" style="width: 100%" alt="" />
            </el-dialog>
        </div>

        <div class="editPassword">
            <el-dialog :title="$t('menu.help')" :visible.sync="helpDio" width="12.4rem" :close-on-click-modal="false">
                <div slot="title" class="header-title">
                    <div
                        class="ht_cp"
                        v-for="(item, index) in helpTitle"
                        :key="index"
                        @click="tabHelpTitle(index)"
                        :class="[numtype == index ? 'titleColor2' : 'titleColor3']"
                    >
                        <div class="ht_cp_name">{{ item.name }}</div>
                        <div class="ht_cp_heng" v-show="numtype == index"></div>
                    </div>
                </div>

                <div class="helpBody" v-if="numtype == 0">
                    <div class="hb_left">
                        <div class="hb_l_box">
                            <div class="hbb_head">产品简介</div>
                            <div class="hbb_body">
                                <ul>
                                    <li>产品概述</li>
                                    <li>核心优势</li>
                                    <li>产品构成及各端介绍</li>
                                    <li>运行环境</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="hb_right">暂无内容</div>
                </div>
                <div class="helpBody" v-if="numtype == 1">
                    <div class="hb_left">
                        <div class="hb_l_box">
                            <div class="hbb_head">功能说明</div>
                            <div class="hbb_body">
                                <ul>
                                    <li
                                        v-for="(jsc, index) in gongNengList"
                                        :key="index"
                                        @click="jscTitle = index"
                                        :class="[jscTitle == index ? 'titleColor2' : 'titleColor3']"
                                    >
                                        {{ jsc.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="hb_right" v-if="jscTitle == 0">
                        <div class="hb_r_title">驾驶舱</div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">驾驶舱显示</div>
                            <p>
                                驾驶舱页面由设备实时状态、运行总统计、车间运行对比、运行设备、停止设备、低速运行设备、运行低效榜以及超时预警等八大功能版块组成，由于驾驶舱页面的设备数据都是直接从设备上采集的，最大程度上排除了人为干扰的因素，因此可以使企业中高层领导全面快速的了解设备真实的运行情况，以及各车间的生产负荷情况。
                            </p>
                            <p>根据不同的企业需求，可以对各功能版块进行定制化修改，使驾驶舱功能更加符合企业自身的业务需求。</p>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/jiashicang.png')"
                                src="https://data.moldcube.com/miniprocessHelp/jiashicang.png"
                                alt=""
                            />
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">设备实时状态</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/shishizhuangtai.png')"
                                src="https://data.moldcube.com/miniprocessHelp/shishizhuangtai.png"
                                alt=""
                            />
                            <p>
                                驾驶舱页面的设备实时状态目前分为运行、手动、复位、停止、暂停、离线六个状态以及设备总连接数。将设备的实时状态按照上述六个状态进行分类展示。
                            </p>
                            <p>
                                根相较于以前只能通过日报、晨会等方式了解生产情况。设备实时状态的展示，可以第一时间为管理者提供设备运行状态的信息。特别是离线状态设备多时，管理者可以更有针对性的进行生产调度，优化产能，提高精益管理的水平。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">运行总统计</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/yunxingzongtongji.png')"
                                src="https://data.moldcube.com/miniprocessHelp/yunxingzongtongji.png"
                                alt=""
                            />
                            <p>
                                对企业所有设备的状态时长进行统计（包含序号、运行状态、运行时长、总量百分比等字段），并以图表的形式进行展示各状态所占比例（分为运行占比、停止占比、离线占比），使管理者能非常直观的了解设备运行效率。系统还支持时间范围查询，可以查询指定时间范围内设备各状态的时长以及占比信息。
                            </p>
                            <p>
                                相较于以前管理者无法了解设备运行的准确信息，只能以工单的完成进度来进行生产管理。运行统计为管理者提供了所有设备各状态时长的整体占比，可以准确掌握企业整体的设备运行情况，同时还可以追溯任意时间段内的设备运行情况。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">车间运行对比</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/chejianduibi.png')"
                                src="https://data.moldcube.com/miniprocessHelp/chejianduibi.png"
                                alt=""
                            />
                            <p>
                                将设备的状态数据按车间进行分类，以柱状图的形式将每个车间设备的状态时长进行展示，管理者可以清楚的看到每个车间的设备运行情况，了解各车间的设备运行效率。当某个车间设备停止、离线时间长，及时了解问题原因，并进行合理的生产调度、排产，提高设备运行效率。
                            </p>
                            <p>
                                相较于以前管理者只能通过上报的形式了解生产情况，不能排除虚假上报等人为因素的干扰，对车间无法精确问责。车间运行对比为管理者提供了设备真实的数据基础，对车间进行管理时有据可依，提高精益管理。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">运行设备</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/yunxingshebei.png')"
                                src="https://data.moldcube.com/miniprocessHelp/yunxingshebei.png"
                                alt=""
                            />
                            <p>
                                展示所有设备的运行时长以及运行占比（包含设备编号、运行时长、运行占比等字段），同时对运行占比低于30%的设备进行高亮显示，使管理者可以聚焦运行占比低的设备，更有针对性的解决生产问题，提高设备运行效率以及生产效率。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">停止设备</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/tingzhishebei.png')"
                                src="https://data.moldcube.com/miniprocessHelp/tingzhishebei.png"
                                alt=""
                            />
                            <p>
                                展示所有设备的停止时长以及运行占比（包含设备编号、停止时长、停止占比等字段），同时对停止占比高于30%的设备进行高亮显示，使管理者可以聚焦停止占比高的设备，分析停止时间长的原因，优化生产流程，提高设备运行效率以及生产效率。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">低速运行设备</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/disuyunxing.png')"
                                src="https://data.moldcube.com/miniprocessHelp/disuyunxing.png"
                                alt=""
                            />
                            <p>
                                展示进给倍率低于100%的设备，其中对小于
                                30%的设备进行高亮显示（包含设备编号、持续时长、进给倍率等字段）。管理者可以针对展示的设备进行分析，是什么原因导致了进给倍率较低，是程序设定的原因或者设备操作员的人为原因，如果是程序设定的原因，可以提醒程序员优化程序，从而提高程序员的业务能力；如果是操作员的人为因素，可以有针对性的对员工进行操作培训，以及完善生产规定。从而保证设备的运行效率。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">运行低效榜</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/yunxingdixiao.png')"
                                src="https://data.moldcube.com/miniprocessHelp/yunxingdixiao.png"
                                alt=""
                            />
                            <p>
                                运行低效榜根据设备的运行占比和停止占比进行了综合排序（包含排名、设备编号、运行占比、停止占比等字段），对运行占比低、停止占比高的设备进行展示，使管理者非常直观的了解低效设备的情况，有针对性的调查设备低效运行的原因，做到责任到人，责任到设备，同时为员工奖惩规则的实施提供了真实的数据依据。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">超时预警</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/chaoshiyujing.png')"
                                src="https://data.moldcube.com/miniprocessHelp/chaoshiyujing.png"
                                alt=""
                            />
                            <p>
                                对除了运行状态以外的其他状态（如手动、停止、打表分中等状态），超过半小时仍然没有状态变化的设备进行展示（包含设备编号、当前状态、开始时间、持续时间等字段），可以是管理者第一时间了解预警设备，从而提高管理的及时性以及处置事件的反应速度。
                            </p>
                        </div>
                    </div>
                    <div class="hb_right" v-if="jscTitle == 1">
                        <div class="hb_r_title">表格</div>
                        <div class="hb_r_er">
                            <p>
                                该功能页面展示企业所有设备的状态信息（包含了车间号、设备号、实时状态、运行时长、手动时长、复位时长、停机时长、离线时长、运行占比、操作等字段）。
                            </p>
                            <div class="hb_r_er_title">表格主页</div>

                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/table.png')"
                                src="https://data.moldcube.com/miniprocessHelp/table.png"
                                alt=""
                            />
                            <p>
                                使生产管理者全面了解设备的运行状态，可以根据各种维度状态对设备进行排序，有针对性的进行生产管理，为做成生产报告提供数据支持。
                            </p>
                            <div class="hb_r_er_title">设备状态明细</div>

                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/shebeimingxi.png')"
                                src="https://data.moldcube.com/miniprocessHelp/shebeimingxi.png"
                                alt=""
                            />
                            <p>
                                该页面记录了单机设备的所有运行数据，可以根据使用者指定的时间范围，显示该设备所有的运行信息（包含序号、状态、总时长、主轴转数、主轴倍率、进给速度、进给倍率、开始时间、结束时间），追溯设备的运行数据，为管理者分析单机设备提供了数据支持。
                            </p>
                        </div>
                    </div>
                    <div class="hb_right" v-if="jscTitle == 2">
                        <div class="hb_r_title">车间</div>
                        <div class="hb_r_er">
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/chejian.png')"
                                src="https://data.moldcube.com/miniprocessHelp/chejian.png"
                                alt=""
                            />
                            <p>
                                车间页面展示功能与驾驶舱功能相似，是以车间为单位，显示该车间的设备状态，可以指导车间负责人进行合理排产，帮助负责人及时发现设备问题、解决问题、向上级上报生产情况。
                            </p>
                        </div>
                    </div>
                    <div class="hb_right" v-if="jscTitle == 3">
                        <div class="hb_r_title">进给倍率</div>
                        <div class="hb_r_er">
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/jinji.png')"
                                src="https://data.moldcube.com/miniprocessHelp/jinji.png"
                                alt=""
                            />
                            <div class="hb_r_er_title">显示设备进给倍率曲线图表</div>
                            <p>
                                菜单栏选择【进给倍率】，根据日期（默认本日）、时间区间（默认0~24时）、过滤时间（如：1分钟、5分钟、10分钟等），查询并显示对应各设备进给倍率曲线图表。
                            </p>
                            <p>其中设备进给倍率曲线图包含，倍率平均值、最大值、最小值等维度。</p>
                        </div>
                    </div>
                    <div class="hb_right" v-if="jscTitle == 4">
                        <div class="hb_r_title">日报</div>
                        <div class="hb_r_er">
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/ribao.png')"
                                src="https://data.moldcube.com/miniprocessHelp/ribao.png"
                                alt=""
                            />
                            <div class="hb_r_er_title">查看日报信息</div>
                            <p>显示日报信息</p>
                            <p>菜单栏选择【日报】，根据日期（默认上一日），查询并显示下表信息</p>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/ribailong.png')"
                                src="https://data.moldcube.com/miniprocessHelp/ribailong.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="hb_right" v-if="jscTitle == 5">
                        <div class="hb_r_title">状态上报</div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">查看状态信息</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/zhuangtaishangbao.png')"
                                src="https://data.moldcube.com/miniprocessHelp/zhuangtaishangbao.png"
                                alt=""
                            />

                            <p>显示状态信息</p>
                            <p>
                                菜单栏选择【状态上报】，根据车间信息（默认全部车间）、时间区间（可设置），查询并显示对应状态信息，如：车间号（包含：各企业自主设置的车间区域信息，进行多选与重置）、设备、上报人、上报原因、开始时间、结束时间、总时长、操作等。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">选择状态信息</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/xianshizhuangtai.png')"
                                src="https://data.moldcube.com/miniprocessHelp/xianshizhuangtai.png"
                                alt=""
                            />

                            <p>
                                点击操作栏【明细】按钮，显示该条状态信息对应详细内容，如：序号、状态（包含：运行、手动、复位、停止、离线、暂停、开机、回原点、预热、拉水平等状态信选项，可进行多选与重置）、总时长（分钟）、开始时间、结束时间、上报时间等内容。并可选中列表中的一条信息，点击“撤销”按钮进行撤销。
                            </p>
                        </div>
                        <div class="hb_r_er">
                            <div class="hb_r_er_title">手动上报</div>
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/shoudongshangbao.png')"
                                src="https://data.moldcube.com/miniprocessHelp/shoudongshangbao.png"
                                alt=""
                            />

                            <p>
                                点击操作栏【手动上报】按钮，显示根据车间、设备、查询区间等条件查询出的信息内容，如：序号、设备、状态（包含：运行、手动、复位、停止、离线、暂停、开机、回原点、预热、拉水平等状态信选项，可进行多选与重置）、总时长（分钟）、开始时间、结束时间、上报时间等内容。并可选中一项或多项列表中的数据，点击【上报】按钮，并根据【上报原因】（如：机器维修、保养、缺料、无工待机、无生产任务、其他等）进行手动上报。
                            </p>
                        </div>
                    </div>
                    <div class="hb_right" v-if="jscTitle == 6">
                        <div class="hb_r_title">实时状态</div>
                        <div class="hb_r_er">
                            <img
                                class="imgClass"
                                @click="innerDio('https://data.moldcube.com/miniprocessHelp/shishi.png')"
                                src="https://data.moldcube.com/miniprocessHelp/shishi.png"
                                alt=""
                            />
                            <div class="hb_r_er_title">查看实时状态信息</div>
                            <p>显示实时状态信息</p>
                            <p>
                                菜单栏选择【实时状态】，根据设备编号、车间等条件，查询并显示对应设备运行情况，如：设备编号、状态、主轴转速、主轴倍率、进给速度、进给倍率、加工记件、循环时间、XYZ轴数据变化等信息，初始默认显示为企业全部车间的全部设备。
                            </p>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { set_user_pwd, setpwd } from '../../../api/api';
export default {
    components: {},
    data() {
        return {
            dialogVisible: false,
            ruleForm: {},
            rules: {
                pwd: [{ required: true, message: this.$t('menu.enterOldPassword'), trigger: 'blur' }],
                newpwd: [{ required: true, message: this.$t('menu.enterNewPassword'), trigger: 'blur' }],
                newpwdAgain: [{ required: true, message: this.$t('menu.enterAgainNewPassword'), trigger: 'blur' }]
            },
            themeDio: false,
            themeStatus: 1,
            themeList: [
                { id: 1, name: this.$t('menu.themeOne'), url: require('../../common/comImg/index/hui.png') },
                { id: 2, name: this.$t('menu.themeTwo'), url: require('../../common/comImg/index/hei.png') },
                { id: 3, name: this.$t('menu.themeThree'), url: require('../../common/comImg/index/bai.png') }
            ],
            innerVisible: false,
            themeUrl: '',
            helpDio: false,
            helpTitle: [
                { id: 1, name: this.$t('menu.productIntroduction') },
                { id: 2, name: this.$t('menu.functionDeclaration') }
            ],
            numtype: 1,
            gongNengList: [
                { id: 1, name: '驾驶舱' },
                { id: 2, name: '表格' },
                { id: 3, name: '车间' },
                { id: 4, name: '进给倍率' },
                { id: 5, name: '日报' },
                { id: 6, name: '状态上报' },
                { id: 7, name: '实时状态' }
            ],
            jscTitle: 0,
            miao: true
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.themeStatus = Number(localStorage.getItem('login_staus'));
        this.miao = JSON.parse(localStorage.getItem('getMiao') ? JSON.parse(localStorage.getItem('getMiao')) : true);
    },
    methods: {
        showMiao() {
            this.miao = !this.miao;
            this.$emit('showmiao', this.miao);
            localStorage.setItem('getMiao', this.miao);
        },
        editPass() {
            this.ruleForm = {};
            this.dialogVisible = true;
        },
        loginOut() {
            this.$confirm(this.$t('menu.sureLoginOut'), this.$t('menu.tips'), {
                confirmButtonText: this.$t('menu.sure'),
                cancelButtonText: this.$t('menu.cancel'),
                type: 'warning'
            })
                .then(() => {
                    // localStorage.clear();
                    localStorage.removeItem('comp_id');
                    localStorage.removeItem('comp_name1');
                    localStorage.removeItem('shangBaoName');
                    localStorage.removeItem('getMiao');
                    if (localStorage.getItem('localSetBanCi')) {
                        let localSetBanCi = JSON.parse(localStorage.getItem('localSetBanCi'));
                        if (localSetBanCi.checkIndex == 3) {
                            localStorage.removeItem('localSetBanCi');
                            localStorage.removeItem('saveTime');
                        }
                    }

                    this.$router.replace('/login');
                    this.$message({
                        type: 'success',
                        message: this.$t('menu.loginOutSuccess')
                    });
                })
                .catch(() => {});
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!localStorage.getItem('shangBaoName')) {
                        this.$message.warning(this.$t('menu.PleaseLoginAgain'));
                        localStorage.clear();
                        this.$router.replace('/login');
                        return;
                    }
                    if (this.ruleForm.newpwd != this.ruleForm.newpwdAgain) {
                        this.$message.warning(this.$t('menu.keepSama'));
                        return;
                    }
                    this.getSet_user_pwd();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getSet_user_pwd() {
            let params = {
                name: localStorage.getItem('userName'),
                pwd: this.ruleForm.pwd,
                pwdNew: this.ruleForm.newpwd
            };
            setpwd(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    if (Data == 1) {
                        this.$message.success(this.$t('menu.editSuccess'));
                        this.dialogVisible = false;
                        localStorage.clear();
                        this.$router.replace('/login');
                    } else if (Data == -1) {
                        this.$message.warning(this.$t('menu.oldPasswordIncorrect'));
                        return;
                    } else if (Data == 0) {
                        this.$message.warning(this.$t('menu.editfail'));
                        return;
                    }
                }
            });
        },
        checkTheme() {
            this.themeDio = true;
        },
        innerDio(url) {
            this.innerVisible = true;
            this.themeUrl = url;
        },
        changeTheme() {
            localStorage.setItem('login_staus', this.themeStatus);
            // this.$store.commit('loginStaus', this.themeStatus);
            // this.$message.success('设置成功，请重新登录');
            // localStorage.clear();
            // this.$router.replace('/login');
            location.reload();
        },
        helpText() {
            this.helpDio = true;
        },
        tabHelpTitle(index) {
            this.numtype = index;
        }
    },
    created() {},

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
};
</script>
<style lang='scss' >
//@import url(); 引入公共css类
.neizhiDio {
    .el-dialog__wrapper {
        .el-dialog {
            background: transparent;
            .el-dialog__header {
                padding: 0;
                padding-bottom: 0;
            }
            .el-dialog__body {
                padding: 0;
            }
        }
    }
}
</style>