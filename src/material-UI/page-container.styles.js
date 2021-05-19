import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const PageContainer = withStyles({
  root: {
    position: 'relative',
    top:'76px',
    height: '89vh'
  }
})(Container)

export default PageContainer