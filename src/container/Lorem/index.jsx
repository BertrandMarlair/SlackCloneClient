import React from 'react'

import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import LoremStyle from './LoremStyle'
import Title from '../../component/Typography/Title'
import Text from '../../component/Typography/Text'

const Lorem = ({ classes, history }) => {
    return (
        <div className={classes.container}>
            <Title centered>Lorem Page</Title>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut felis tellus, tincidunt ac dui eget, pretium rhoncus odio.Nunc tempor eleifend dolor.Duis venenatis, ipsum eu lobortis efficitur, massa nulla malesuada sapien, nec ultrices tortor velit a metus.Donec at pretium lacus.Suspendisse commodo sem mattis, fringilla ligula sit amet, aliquam eros.Suspendisse augue mauris, laoreet id vestibulum quis, mattis in odio.Morbi gravida diam sit amet mauris ultricies, non tincidunt purus fermentum.Quisque porttitor, dui vel mollis lobortis, justo lorem efficitur est, et suscipit purus magna ut tortor.Quisque luctus erat sed turpis cursus fermentum.

                Cras ullamcorper nisl leo, vel lacinia nulla rhoncus at.Aenean vitae ligula felis.Etiam mattis lobortis ligula.Nullam sit amet justo feugiat nunc dapibus tincidunt.In sem mauris, sollicitudin quis tincidunt nec, pretium vel dolor.Praesent ut risus ultricies arcu tempor elementum at ac purus.Morbi turpis massa, interdum ac velit non, ornare pretium erat.Aliquam erat volutpat.Sed pretium tempor nibh, volutpat elementum leo finibus ut.Etiam quis nisl ac massa condimentum dapibus eu ut ipsum.Mauris bibendum vulputate nunc, quis convallis ipsum aliquam nec.

                Integer et facilisis massa, in vestibulum sapien.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Aenean ac nibh rutrum, tempus neque sed, efficitur risus.Nam condimentum massa dolor, quis mattis est mollis eu.Morbi ac leo in neque vestibulum dignissim eu id diam.Nullam quis dolor metus.Donec luctus dapibus malesuada.Cras non neque quis urna tristique accumsan.Proin rutrum lacus vel mi posuere finibus.Aenean maximus turpis urna, ac hendrerit odio ultrices ac.Fusce volutpat erat libero, sit amet aliquam lacus luctus id.Integer rutrum imperdiet felis in iaculis.Etiam vestibulum elit ac lorem euismod, sed feugiat justo efficitur.Cras nisi augue, semper at enim ac, ultricies cursus libero.Maecenas sed fermentum ligula, eu rhoncus ligula.

                Duis diam leo, iaculis quis nisi ac, imperdiet lobortis nibh.Vestibulum et nulla condimentum odio mattis condimentum.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Nullam dignissim nisl elit, sit amet gravida erat ornare in.Morbi sit amet facilisis sapien.Curabitur lobortis nisi vitae lacus lobortis, sed tempus orci rhoncus.Aenean feugiat gravida dapibus.Sed at augue id metus varius laoreet malesuada in arcu.Donec eros dui, pulvinar sed augue vel, semper faucibus eros.Aliquam nec sodales nisl.In mollis dui ligula, eu luctus nibh dapibus non.Suspendisse bibendum accumsan ex, quis interdum leo tempor semper.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;

                Sed condimentum est sed leo feugiat, at ullamcorper ligula condimentum.Etiam malesuada dapibus posuere.Quisque vitae dui elementum, semper mi efficitur, vehicula magna.Duis nec egestas risus, in rhoncus est.Cras a ex lacinia, porttitor dui et, eleifend sem.Fusce non sodales nunc.In venenatis ante et sagittis semper.
            </Text>
        </div>
    )
}

export default compose(
    withStyles(LoremStyle),
    withRouter
)(Lorem)