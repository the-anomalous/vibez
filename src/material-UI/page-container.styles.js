import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const PageContainer = withStyles({
  root: {
    height: '100vh'
  }
})(Container)

export default PageContainer