import type { NextPage } from 'next'
import React from "react";
import { Allotment } from "allotment";
import CustomizedEditorjs from './RenderNewEditorjs';
import { Panes } from './Panes';
import Test from './test'
import UpdatedListItem from './test2'
import Test3 from './test3'
import Test4 from './test4'

const Home: NextPage = () => {
  console.clear();

  return (
    <div className="main-block">
      <Panes />
    </div>
  )
}

export default Home
