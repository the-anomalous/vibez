import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const PageContainer = withStyles({
  root: {
    position: 'fixed',
    top: 76,
    height: '100vh'
  }
})(Container)

export default PageContainer