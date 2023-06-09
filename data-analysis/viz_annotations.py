import numpy as np
import pandas as pd
import cv2
import os
import shutil

userid = '6_9'
df = pd.read_csv('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/gt_annotations_'+userid+'.csv')
# gt_vehicles = list(df['vehicle_ids'])
image_names = list(df['image_name'])
bbs_list = df['annotations']
pid_list = df['pid'].tolist()
pid_dict =  {}
for p, pid in enumerate(pid_list):
    if str(pid) != 'nan':
        pid_dict[str(df['uniqueid'].tolist()[p])] = str(pid)
print(pid_dict)
for i, img_name in enumerate(image_names):
    if df['phase'].tolist()[i] != 'TRIAL':
        continue
    
    data_file = img_name.split('.')[0].replace('image_', '') + '.npy'
    # if 'trial' in data_file:
    #     continue
    # data = np.load('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/old_study/stimuli_data/' + data_file, allow_pickle=True)
    img = cv2.imread('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/static/stimuli_images/' + img_name)
    # dir_name = img_name.split("_")[2]
    # img_number = img_name.split("_")[-1]

    print(bbs_list[i], img_name)
    if bbs_list[i] == '[]':
        if os.path.exists('./data-analysis/annotation_visualization/' + userid ) == False:
            os.mkdir('./data-analysis/annotation_visualization/' + userid)
        if os.path.exists('./data-analysis/annotation_visualization/' + userid + '/' + pid_dict[str(df['uniqueid'].tolist()[i])]) == False:
            os.mkdir('./data-analysis/annotation_visualization/' + userid + '/' + pid_dict[str(df['uniqueid'].tolist()[i])])
        cv2.imwrite('./data-analysis/annotation_visualization/' + userid + '/' + pid_dict[str(df['uniqueid'].tolist()[i])]+ '/' + img_name, img)


    else:
        bbs = bbs_list[i][2:-2].split('], [')

        for j in range(len(bbs)):
            # print([k for k in bbs[j].split(',')])
            bb = [int(k.split('.')[0]) for k in bbs[j].split(',')]
            # print(bb[2:-2].split(','))
            viz = cv2.rectangle(img, tuple([bb[0], bb[1]]), tuple([bb[0] + bb[2], bb[1] + bb[3]]), (255, 0, 0), 2)
        if os.path.exists('./data-analysis/annotation_visualization/' + userid ) == False:
            os.mkdir('./data-analysis/annotation_visualization/' + userid)
        if os.path.exists('./data-analysis/annotation_visualization/' + userid + '/' + pid_dict[str(df['uniqueid'].tolist()[i])]) == False:
            os.mkdir('./data-analysis/annotation_visualization/' + userid + '/' + pid_dict[str(df['uniqueid'].tolist()[i])])
        cv2.imwrite('./data-analysis/annotation_visualization/' + userid + '/' + pid_dict[str(df['uniqueid'].tolist()[i])]+ '/' + img_name, viz)
    # shutil.copy("/home/harpadmin/lav/LAV/lidar_point_clouds/" + dir_name + "/og/bev/" + img_number, './data-analysis/annotation_visualization/' + userid + '/' + str(df['uniqueid'].tolist()[i])+ '/method_' + img_name)

# for i, img_name in enumerate(image_names):
#     removal_gt_scores = []
#     removal_scores = []
#     retention_gt_scores = []
#     retention_scores = []
#     perturb_scores = []
#     plant_gt_scores = []
#     plant_scores = []

#     data_file = img_name.split('.')[0].replace('image_', '') + '.npy'
#     data = np.load('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/static/stimuli_data/' + data_file, allow_pickle=True)
#     #Detect Perturbation based importance vehicles
#     perturb_important_vehicles_raw = data[0]
#     perturb_important_vehicles_bbs = data[1]
#     perturb_important_vehicles = []
#     vehicle_positions = data[-1]
#     for j, vehicle_info in enumerate(perturb_important_vehicles_raw):
#         vehicle_bb = perturb_important_vehicles_bbs[j]
#         xs = np.array([vehicle_bb[b][0] for b in range(4)])
#         ys = np.array([vehicle_bb[b][1] for b in range(4)])
#         for vehicle in vehicle_positions:
#             if vehicle_positions[vehicle][0] <= np.max(xs) and vehicle_positions[vehicle][0] >= np.min(xs) and vehicle_positions[vehicle][1] <= np.max(ys) and vehicle_positions[vehicle][1] >= np.min(ys):
#                 perturb_important_vehicles.append(vehicle)


#     removal_important_vehicles = data[2]
#     local_removal_scores = {}
#     if gt_vehicles[i] == " ":
#         gt = []
#     else:   
#         gt = [int(k) for k in gt_vehicles[i].strip().split(" ")]
#     for vehicle in removal_important_vehicles:

#         if vehicle[0] in gt:
#             removal_gt_scores.append(1)
#         else:
#             removal_gt_scores.append(0)
#         removal_scores.append(vehicle[1])
#         if vehicle[0] in perturb_important_vehicles:
#             perturb_scores.append(1000)
#         else:
#             perturb_scores.append(0)
        


#     # Retention based important vehicles
#     retention_important_vehicles = data[3]
#     for vehicle in retention_important_vehicles:
#         if vehicle[0] in gt:
#             retention_gt_scores.append(1)
#         else:
#             retention_gt_scores.append(0)
#         retention_scores.append(vehicle[1])

#     # plant data
#     plant_data = np.load('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/static/stimuli_data/plant_data_' + data_file, allow_pickle=True)
#     # print(plant_data[0][0][np.argsort(plant_data[0][1])][::-1], gt)
#     for v, vehicle in enumerate(plant_data[0][0]):
#         if int(vehicle) in gt:
#             plant_gt_scores.append(1)
#         else:
#             plant_gt_scores.append(0)
#         plant_scores.append(plant_data[0][1][v])
#     vehicle_positions_og = data[-1]
    
#     img = cv2.imread('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/static/stimuli_images/' + img_name)
#     plant_img = cv2.imread('/home/harpadmin/vehicle_importance_human_annotation/psiturk-harp-template/static/stimuli_images/' + img_name)
    
#     print(img_name)
#     print([v[0] for v in removal_important_vehicles])
#     print(removal_scores)
#     print([v[0] for v in retention_important_vehicles])
#     print(retention_scores)
#     print(perturb_scores)
#     print([v for v in plant_data[0][0]])
#     print(plant_scores)
#     for j, vehicle in enumerate(plant_data[0][0]):
#         if int(vehicle) in vehicle_positions_og:
#             vehicle_positions = vehicle_positions_og[int(vehicle)]
#             plant_img = cv2.rectangle(plant_img, tuple([vehicle_positions[0]-10, vehicle_positions[1]-10]), tuple([vehicle_positions[0]+10, vehicle_positions[1]+10]), (255, 0, 0)*int(min(plant_scores[j], 1)), 2)

#     for j, vehicle in enumerate(removal_important_vehicles):
#         # flag = 0
#         # if removal_scores[i] > 16 or retention_scores[i] > 16 or perturb_scores == 1000:
#         vehicle_positions = vehicle_positions_og[vehicle[0]]
#         # print(vehicle_positions)
#         img = cv2.rectangle(img, tuple([vehicle_positions[0]-10, vehicle_positions[1]-10]), tuple([vehicle_positions[0]+10, vehicle_positions[1]+10]), (255, 0, 0)*int(min(retention_scores[j]/30, 1)), 2)
#         img = cv2.rectangle(img, tuple([vehicle_positions[0]-15, vehicle_positions[1]-15]), tuple([vehicle_positions[0]+15, vehicle_positions[1]+15]), (0, 255, 0)*int(min(removal_scores[j]/30, 1)), 2)
#         img = cv2.rectangle(img, tuple([vehicle_positions[0]-20, vehicle_positions[1]-20]), tuple([vehicle_positions[0]+20, vehicle_positions[1]+20]), (0, 0, 255)*int(min(perturb_scores[j]/1000, 1)), 2)
        
#     cv2.imwrite('./data-analysis/annotation_visualization/' + userid + '/our_' + img_name, img)
#     cv2.imwrite('./data-analysis/annotation_visualization/' + userid + '/plant_' + img_name, plant_img)

            # viz = 
    # print(vehicle_positions)



