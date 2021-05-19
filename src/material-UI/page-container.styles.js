import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const PageContainer = withStyles({
  root: {
    height: '100vh',
    overflow: 'hidden'
  }
})(Container)

export default PageContainer