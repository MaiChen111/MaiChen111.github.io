const btn_html_timer =
    `<button onclick="clearInterval()" class="jspsych-btn" disabled>%choice%</button>`;


/* -----------------------------Blocks: HTML DOM Setting-----------------------------s */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

/* -----------------------------Blocks: Basics----------------------------- */
// 测试介绍

var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: center; line-height: 1.6em">
    🤔<b>你知道自己是一个怎样的家长吗？</b><br/>
    你了解自己的养育方式吗？<br/>
    你知道教养方式不当会带来哪些影响吗？<br/>
    究竟什么样的育儿方式<br/>
    才是最恰当的、最为科学合理的呢？<br/>
    如果你有这个疑惑，不妨来做个测试吧！<br/><br/>

    🍻<b>邀请你参加<br/></b>
    家庭教养方式问卷测评<br/>
    深入了解教养方式<br/>
    重新审视教育模式<br/>
    带你走出教育误区<br/><br/>

    📑<b>你将获得<br/></b>
    家长教养类型报告<br/>
    育儿类型详细解析<br/>
    针对性建议与指导<br/><br/>

    🤞<b>推荐人群<br/></b>
    3岁以上及中小学生父母<br/>
    有兴趣了解育儿方式的人<br/>
    希望改善亲子关系的人<br/>
    希望了解自身的教养方式的人<br/><br/>

    🗃️<b>测试参数<br/></b>
    测量方式：自评<br/>
    测量题数：30题<br/>
    报告页数：5页左右（约3000字）<br/>
    所需时长：10-15分钟<br/><br/>

    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里开始',
    delay_after: 100
}

//指导语
var instr_1 = {
    type: 'instructions',
    pages: [
        `<p style="font: 16pt 微软雅黑; text-align: center; line-height: 1.6em">
        【推荐】本测评的测试者为父母，儿童3周岁以上为佳。<br><br>

        本测评旨在帮助您了解自己的教养方式，为了得出准确的测试结果<br/>
        请您仔细阅读题目，回想您照顾孩子的经历，依照实际情况选出最接近真实情况的答案。<br/>
        如果实在无法准确回忆这些问题，可以凭直觉作答。<br/>
        <span style="color: CornflowerBlue "><b>请不要有任何顾虑，您的答案无所谓对错，只需要给出自己最真实的想法即可。</b></span><br/><br/>
        </p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '我明白了',
    on_load: function() {
        jsPsych.setProgressBar(0.00);
      }
}


//结束后关闭全屏
var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}

/*----------------------------- Blocks: Survey----------------------------- */
var count = 0;
var n_trials = 30;

//维度：权威控制
var Control = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal;">
        请选择最符合您情况的选项<br/>
        </p>
        `,
        choices: ['从不', '较少', '偶尔', '经常', '总是'],
        on_finish: function(data) { 
            //result
            addRespFromButtonScale(data, 'Control') 
            //update progress bar
            count++;
            var progress = count/n_trials;
            jsPsych.setProgressBar(progress);
            
        },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 , Reversescoring: 0}, s: '在教育孩子时，我通过责备和批评促使孩子进步。' },
        { data: { i: 2 , Reversescoring: 0}, s: '在教育孩子时，我更关心自己的感受而不是孩子的感受。' },
        { data: { i: 3 , Reversescoring: 0}, s: '在孩子行为不当时，我用体罚（比如打孩子的屁股，手，或是推搡）来管教孩子。' },
        { data: { i: 4 , Reversescoring: 0}, s: '我打断孩子的话。' },
        { data: { i: 5 , Reversescoring: 0}, s: '孩子行为没达到期望时，我责备或批评他们。' },
        { data: { i: 6 , Reversescoring: 0}, s: '我对孩子发过火，比如孩子不听话时。' },
        { data: { i: 7 , Reversescoring: 0}, s: '我有时对孩子很亲近，有时又会突然变得严厉。' },
        { data: { i: 8 , Reversescoring: 0}, s: '孩子让我难过时，我不理他/她，直到他/她让我满意。' },
        { data: { i: 9 , Reversescoring: 0}, s: '当孩子和我意见不合时，我表现得没那么热情。' },
        { data: { i: 10 , Reversescoring: 0}, s: '在孩子犯错后，我取消孩子的特权作为惩罚，比如不许孩子玩手机，也没解释原因。' },
        { data: { i: 11 , Reversescoring: 0}, s: '责怪孩子时，我会翻旧账。' },
        { data: { i: 12 , Reversescoring: 0}, s: '孩子问为什么守规则时，我说过“因为我说了算”或“因为我是你父母”。' },
    ],
    randomize_order: false
}

//维度：溺爱
var Rules = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal;">
        请选择最符合您情况的选项<br/>
        </p>
        `,
        choices: ['从不', '较少', '偶尔', '经常', '总是'],
        on_finish: function(data) { 
            addRespFromButtonScale(data, 'Rules') 
            //update progress bar
            count++;
            var progress = count/n_trials;
            jsPsych.setProgressBar(progress);
        },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 , Reversescoring: 0}, s: '在孩子不听话时，我表现得无所谓。' },
        { data: { i: 2 , Reversescoring: 0}, s: '在教育孩子时，对孩子不讲是非对错。' },
        { data: { i: 3 , Reversescoring: 0}, s: '我不在乎孩子犯了错。' },
        { data: { i: 4 , Reversescoring: 0}, s: '孩子要什么就给买什么。' },
    ],
    randomize_order: false
}

//维度：沟通引导
var Commu = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal;">
        请选择最符合您情况的选项<br/>
        </p>
        `,
        choices: ['从不', '较少', '偶尔', '经常', '总是'],
        on_finish: function(data) { 
            addRespFromButtonScale(data, 'Commu') 
            //update progress bar
            count++;
            var progress = count/n_trials;
            jsPsych.setProgressBar(progress);
        },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 , Reversescoring: 0}, s: '孩子做出某些行为时，我会告诉他/她这样做的结果是什么。' },
        { data: { i: 2 , Reversescoring: 0}, s: '在要求孩子做某事之前，我会考虑孩子的想法和感受。' },
        { data: { i: 3 , Reversescoring: 0}, s: '与大多数家长相比，孩子出现问题时，我会更加关注孩子的情况。' },
        { data: { i: 4 , Reversescoring: 0}, s: '允许孩子对家庭规则提出自己的意见。' },
        { data: { i: 5 , Reversescoring: 0}, s: '我尊重孩子的想法，鼓励他/她说出自己的看法。' },
        { data: { i: 6 , Reversescoring: 0}, s: '孩子犯错时，我与他/她理性讨论。' },
        { data: { i: 7 , Reversescoring: 0}, s: '与孩子相处时，我会耐心对待孩子。' },
        { data: { i: 8 , Reversescoring: 0}, s: '我会跟孩子说明我对他/她的行为有什么感受。' },
    ],
    randomize_order: false
}

//维度：情感支持
var Support = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal;">
        请选择最符合您情况的选项<br/>
        </p>
        `,
        choices: ['从不', '较少', '偶尔', '经常', '总是'],
        on_finish: function(data) { 
            addRespFromButtonScale(data, 'Support') 
            //update progress bar
            count++;
            var progress = count/n_trials;
            jsPsych.setProgressBar(progress);
        },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 , Reversescoring: 0}, s: '我用拥抱或亲吻等亲昵动作来告诉孩子我爱他/她。' },
        { data: { i: 2 , Reversescoring: 0}, s: '我会与孩子开玩笑和玩耍。' },
        { data: { i: 3 , Reversescoring: 0}, s: '我会与孩子一起度过一些温馨亲密的时光，比如一起玩游戏。' },
        { data: { i: 4 , Reversescoring: 0}, s: '我鼓励并认真倾听孩子谈论他/她的烦恼。' },
        { data: { i: 5 , Reversescoring: 0}, s: '我经常对孩子微笑。' },
        { data: { i: 6 , Reversescoring: 0}, s: '我夸奖我的孩子。' },
    ],
    randomize_order: false
}

/* 结束测评，生成报告 */
var done = {
    type: 'html-button-response',
    stimulus: `
        您已完成测评，请点击下方按钮提交
    `,
    choices: ['提交'],
}

var instr_2 = {
    type: 'html-button-response',
    stimulus: `
        <div class="button-container">
            <img src="/MaiChen111/loading.gif" alt="Loading" id="loadingGif" class="fixed-size-image" />
        </div>
    `,
    choices: [''],
    button_html: btn_html_timer,
    on_load: function() {
        var button = document.querySelector('.jspsych-btn');
        var stimulusImg = document.getElementById('loadingGif');
        button.textContent = '正在分析测评结果……'; // 设置按钮初始文本
        button.disabled = true; // 确保按钮一开始是禁用的

        var tid = setTimeout(function() {
            button.disabled = false; // 3秒后启用按钮
            button.textContent = '查看报告'; // 更新按钮文本
            
            // 创建一个新的img元素以替换loading.gif
            var newImg = document.createElement('img');
            newImg.src = '/MaiChen111/report.jpg'; // 设置新图片的源
            newImg.alt = 'Report'; // 设置替代文本
            newImg.className = 'fixed-size-image'; // 应用相同的类名

            // 替换旧的图片元素
            stimulusImg.parentNode.replaceChild(newImg, stimulusImg);
        }, 3000); // 设置定时器为3000毫秒（3秒）
    }
};


/* -----------------------------Blocks: Feedbacks----------------------------- */

var report = {
    type: 'html-button-response',
    stimulus: function() {
        
        var parentingTypeInfo = generate_parenting_type();
        var great_report = generate_report(parentingTypeInfo);

        console.log('report stimulus function');

        return `
        <p style="font: 16pt 微软雅黑; text-align: center; line-height: 1.6em">
        <b>${parentingTypeInfo.type}</b><br/>

        <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
        【报告阅读说明】<br/>
         感谢你的参与，阅读本报告时，请注意：<br/>
        ●这份报告仅供参考，它并不能替代医生的专业诊断。如果你对报告有任何疑问，或者觉得有些地方不太明白，不妨找个专业人士聊聊。<br/>
        ●报告分为三个部分，第一部分将描述你整体的教养风格，第二部分将深入探讨你在教养过程中不同方面的表现，第三部分再根据测试结果给出相应建议。<br/>
        ●如果你觉得报告中的某些内容和你或者别人的看法不太一样，不妨回想一下，做测试的时候是不是被特别的事情影响了，或者是不是在回答问题时有所保留。<br/>
        ●养育风格理论是基于相关性研究的，这意味着它告诉我们的是事物之间的联系，而不是直接的因果关系。简单来说，有先进教养风格的父母可能会培养出自尊心强、情商高、幸福感满满的孩子。但每个孩子都是独一无二的，我们需要根据孩子的个性、认知能力和其他因素来做出适当的调整。这也是为什么我们认为，最适合的教养风格应该是因人而异的。<br/><br/>
        
        <hr>
        <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
        教养风格是指父母在抚养和教育孩子的过程中秉持的教养观念、教养态度，以及在此过程中通常使用的方法。你的教养风格类型是${parentingTypeInfo.type}。<br/><br/>
        
        <p style="font: 16pt 微软雅黑; text-align: center; line-height: 1.6em">
        测评结果得分如下：<br/>
        权威控制：${SUM('Control')}<br/>
        溺爱：${SUM('Rules')}<br/>
        沟通引导：${SUM('Commu')}<br/>
        情感支持：${SUM('Support')}<br/><br/>
        
        <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">${great_report}</p>
        </p>
        `
    },
    choices: ['继续'],
}

/* -----------------------------Feedback Quiz----------------------------- */
var FQ = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal;">
        请选择最符合您情况的选项<br/>
        </p>
        `,
        choices: ['1', '2', '3', '4', '5'],
        on_finish: function(data) { 
            addRespFromButtonScale(data, 'FQ') 
            //update progress bar
            count++;
            var progress = count/n_trials;
            jsPsych.setProgressBar(progress);
        },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 , Reversescoring: 0}, s: '看完这份报告后你的感受？（1-消极；6-积极）' },
        { data: { i: 2 , Reversescoring: 0}, s: '你觉得这份报告多大程度上符合你的真实情况？' },
        { data: { i: 3 , Reversescoring: 0}, s: '为这份报告以下几个方面评分：1-有用性' },
        { data: { i: 4 , Reversescoring: 0}, s: '为这份报告以下几个方面评分：2-客观性' },
        { data: { i: 5 , Reversescoring: 0}, s: '为这份报告以下几个方面评分：3-趣味性' },
        { data: { i: 6 , Reversescoring: 0}, s: '为这份报告以下几个方面评分：4-科学' },
        { data: { i: 7 , Reversescoring: 0}, s: '为这份报告以下几个方面评分：5-新颖性' },
        { data: { i: 8 , Reversescoring: 0}, s: '为这份报告以下几个方面评分：6-读起来轻松' },
        { data: { i: 9, Reversescoring: 0}, s: '看完报告后，你有多大程度上【想要深入了解育儿知识】？' },
        { data: { i: 10 , Reversescoring: 0}, s: '看完报告后，你有多大程度上【会参加测试报告最后的挑战任务】？' },
    ],
    randomize_order: false,
    choices: ['退出'],
}

/* -----------------------------Combine Timelines----------------------------- */

var surveys = {
    timeline: [
        Control,
        Rules,
        Commu,
        Support,
    ],
}

var main_timeline = [
    set_html_style,
    open_fullscreen,
    instr_1,
    surveys,
    done,
    instr_2,
    report,
    FQ,
    close_fullscreen,
]

/* -----------------------------Launch jsPsyc-----------------------------h */
jsPsych.init({
    //timeline
    timeline: main_timeline,

    //progressbar
    show_progress_bar: true,
    auto_update_progress_bar: false,
    message_progress_bar: '测评进度',

    //when finish
    on_finish: function() {
        document.getElementById('jspsych-content').innerHTML += '测评结束，感谢您的参与！'
    }
})
