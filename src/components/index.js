import component from "./component";
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(component);