const myInput = {
    props:['label','value','checked'],
    data:{
        checked:false
    },
    template:`  
        <div>
            <label :for="label">
            {{value}}
            <input v-bind='$attrs' :value='value' v-on='inputListener'  >
            <my-checkbox v-model="checked" />
        </div>
    `,
    computed:{
        inputListener(){
            return Object.assign({},this.$listener,{
                input:(e)=>{
                    this.$emit('input',e.target.value)
                }
            })
        }
    }
}

Vue.component('my-checkbox',{
    model:{
        event:'change',
        prop:'checked'
    },
    props:{
        checked:Boolean
    },
    template:`
        <div>
            <input :checked="checked" v-on:change="$emit('change',$event.target.checked)" type="checkbox">{{checked}}
        </div>
    `
})
const myBox = {
    'my-box': {
        props: ['checkboxval', 'inp'],
        components: {
            myInput
        },
        data(){
            return {
                hero: ['ironman', 'superman', 'captain', 'spiderman']
            }
        },
        template: `
        <div>
            <h3>title</h3>
            <slot name="mybox" :hero="hero" />
            <myInput :checked="checkboxval" v-model="inp" />
        </div>
    `
    }
}


function addGlobalComp(comp,Vue){
    Object.keys(comp).forEach(name=>{
        n = name.replace(/^\.\/_/,'').replace(/\.\w+/,'').split('-').map(name=>name.charAt(0).toUpperCase()+name.slice(1)).join('')
        const installComp = {
            install(Vue){
                Vue.component(n,comp[name])
            }
        }
        Vue.use(installComp)
    })
}
addGlobalComp(myBox,Vue)
new Vue({
    data:{
        inp:'',
        checkboxval:true,
        hero: ['ironman', 'superman', 'captain', 'spiderman']
    },
    components:{
        myInput
    },
    template:`
    <myBox :checkboxval="checkboxval" :inp="inp">
        <template #mybox="{hero}">
            <ul>
                <li v-for="(h,i) in hero" :key="i">{{h}}</li>
            </ul>
        </template>
    </myBox>`
}).$mount('#app')