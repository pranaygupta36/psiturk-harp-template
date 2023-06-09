import pandas as pd
import numpy as np
import cv2
import os

userid = 'consensus_debug'
df = pd.read_csv("/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/gt_annotations_debug.csv")
# df1 = pd.read_csv("/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/old_study/gt_annotations_5_31.csv")
# df2 = pd.read_csv("/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/old_study/gt_annotations_5_31_2.csv")
# df3 = pd.read_csv("/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/old_study/gt_annotations_5_31_3.csv")

# df = pd.concat([df1, df2, df3])
img_dict = {}

for i, img_name in enumerate(df['image_name'].tolist()):
    if str(img_name) == 'nan':
        continue
    else:
        # img = cv2.imread('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/old_study/stimuli_images/' + img_name)
        if img_name in img_dict:
            img_dict[img_name].append(df['annotations'].tolist()[i])
        else:
            img_dict[img_name] = [df['annotations'].tolist()[i]]

for img_name in img_dict:
    img = cv2.imread('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/static/stimuli_images/' + img_name)
    bbs = img_dict[img_name]
    for bbox in bbs:
        if bbox == '[]':
            continue
        b = bbox[2:-2].split('], [')
        for j in range(len(b)):
            # print([k for k in bbs[j].split(',')])
            bb = [int(k.split('.')[0]) for k in b[j].split(',')]
            # print(bb[2:-2].split(','))
            viz = cv2.rectangle(img, tuple([bb[0], bb[1]]), tuple([bb[0] + bb[2], bb[1] + bb[3]]), (255, 0, 0), 2)
        if os.path.exists('./data-analysis/annotation_visualization/' + userid ) == False:
            os.mkdir('./data-analysis/annotation_visualization/' + userid)
        # if os.path.exists('./data-analysis/annotation_visualization/' + userid + '/' + pid_dict[str(df['uniqueid'].tolist()[i])]) == False:
        #     os.mkdir('./data-analysis/annotation_visualization/' + userid + '/' + pid_dict[str(df['uniqueid'].tolist()[i])])
        cv2.imwrite('./data-analysis/annotation_visualization/' + userid + '/' + str(len(bbs))+"_"+img_name, viz)

    # print(len(img_dict[k]))
# print(img_dict)