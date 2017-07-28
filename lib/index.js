/**
 * Updated by Lucy on 2017/7/28.
 */
var Toast = {},
    showToast = false;

Toast.install = function (Vue, options) {
    var opt = {
        defaultType:'center',
        duration:'2500'
    };
    for(var property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$toolTip = function(tips,type){

        var curType = type ? type : opt.defaultType;

        if(showToast){
            // 如果toast还在，则不再执行
            return;
        }

        var Tip = Vue.extend({
            data: function(){
                return {
                    show: showToast
                }
            },
            template: '<div v-if="show" class="lx-toast lx-toast-'+ curType +'">' + tips + '</div>'
        });
        var vm = new Tip();
        var tpl = vm.$mount().$el;

        document.body.appendChild(tpl);
        vm.show = showToast = true;

        var timeTem = setTimeout(function () {
            vm.show = showToast = false;
            clearTimeout(timeTem);
        }, opt.duration)
    };
    ['bottom', 'center', 'top'].forEach(function(type) {
        Vue.prototype.$toolTip[type] = function(tips) {
            return Vue.prototype.$toolTip(tips,type)
        }
    });
}
module.exports = Toast;