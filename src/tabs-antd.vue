<script>
  import Vue from 'vue'
  import TabHead from './tabs-head'
  import TabBody from './tabs-body'
  import TabItem from './tabs-item'
  import TabPane from './tabs-pane'
  import Tabs from './tabs'

  export default {
    name: "tabs-antd",
    props: {
      selected: {
        type: String,
        required: true,
      },
    },
    components: {
      TabHead,
      TabBody,
      TabItem,
      TabPane,
      Tabs
    },
    data() {
      return {
        tabsChildren: [],
      }
    },
    render(h) {
      const tabItems = this.tabsChildren.map(tab => <TabItem name={tab.key}>{tab.attrs.tab}</TabItem>);
      const tabpanes = this.tabsChildren.map(tab => <TabPane name={tab.key}>{tab.content}</TabPane>);
      return (
          <Tabs selected$sync={this.selected}>
            <TabHead>
              {tabItems}
            </TabHead>
            <TabBody>
              {tabpanes}
            </TabBody>
          </Tabs>
      )
    },
    beforeMount() {
      this.$slots.default.map(slot => {
        if (slot.tag === 'g-tab-pane') {
          const {key, attrs} = slot.data
          const content = slot.children
          this.tabsChildren.push({key, attrs, content})
        }
      })
    }
  }
</script>
