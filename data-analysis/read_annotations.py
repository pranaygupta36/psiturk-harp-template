from sqlalchemy import create_engine, MetaData, Table
import json
import pandas as pd
import scipy.stats as stats
import matplotlib.pyplot as plt
import numpy as np



'''
 START: BOILER PLATE SET UP
'''
db_url = "sqlite:///participants.db"
table_name = 'turkdemo'
data_column_name = 'datastring'
# boilerplace sqlalchemy setup
engine = create_engine(db_url)
metadata = MetaData()
metadata.bind = engine
table = Table(table_name, metadata, autoload=True)
# make a query and loop through
s = table.select()
rows = s.execute()

data = []
for row in rows:
    data.append(row[data_column_name])
# print(data)
data = [json.loads(part)['data'] for part in data if part is not None]

for part in data:
    if part is not None:
        for record in part:
            record['trialdata']['uniqueid'] = record['uniqueid']

new_data = []
for part in data:
    if part is not None:
        for record in part:
            # if part is not None
            new_data.append(record['trialdata']) 
        # data = [record['trialdata']] for part in data for record in part]

print(new_data[0])
df = pd.DataFrame(new_data)
print(df.keys())
print(df)
#Just stimulus trials
df_trials = df[['uniqueid', 'phase', 'annotations', 'image_name', 'pid', 'dl', 'exp', 'habit']] 
# print(df_trials[25:])
# df_trials = df_trials[df_trials['phase'] == 'TRIAL']



annotations = df_trials['annotations']
bbs = []
print(annotations)
for i in annotations:
    # print(i)
    if str(i) == 'nan':
        bbs.append([])
    else:
        local_bbs = []
        for box in i:
            local_bbs.append([float(v) for v in box['target']['selector']['value'].split(":")[1].split(',')])
        bbs.append(local_bbs)

df_trials['annotations'] = bbs

vehicle_ids = []
removal_scores = []
retention_scores = []
for trial in range(len(df_trials)):
    if df_trials['phase'].tolist()[trial] != 'TRIAL':
        vehicle_ids.append("")
        continue
    bbs = df_trials['annotations'].tolist()[trial]
    img_name = df_trials['image_name'].tolist()[trial].split('.')[0]
    if 'trial' in img_name:
        vehicle_ids.append("")
        continue
    # data_file = img_name.split('.')[0].replace('image_', '') + '.npy'
    data_file = img_name.split(".")[0].split("_")[-1] + '.npy'
    dir_name = img_name.split("_")[2]
    data = np.load("/home/harpadmin/lav/LAV/lidar_point_clouds/" + dir_name + "/data/" + data_file, allow_pickle=True)
    # data = np.load('./static/stimuli_data/' + data_file, allow_pickle=True)
    # print(data)
    vehicle_positions = data[-1]
    local_vehicle_ids = " "
    
    # read annotated vehicles
    # print(vehicle_positions)
    for bb in bbs:
        for vehicle in vehicle_positions:
            #xywh
            if vehicle_positions[vehicle][0] >= bb[0] and vehicle_positions[vehicle][0] <= bb[0] + bb[2] and vehicle_positions[vehicle][1] >= bb[1] and vehicle_positions[vehicle][1] <= bb[1] + bb[3]:            
                local_vehicle_ids += str(vehicle) + " "
    vehicle_ids.append(local_vehicle_ids)
    # print(local_vehicle_ids)

#     # Perturbation based important vehicles
#     perturbation_important_vehicles = data[0]
#     og_det = data[3]
#     # df_trials['perturbation importance vehicles'] = []
    

#     # Removal based important vehicles
#     removal_important_vehicles = data[1]
#     local_removal_scores = {}
#     for gt_vehicle in local_vehicle_ids:
#         for vehicles in removal_important_vehicles:
#             if gt_vehicle == vehicles[0]:
#                 local_removal_scores[gt_vehicle] = vehicles[1]
    
#     removal_scores.append(local_removal_scores)


#     # Retention based important vehicles
#     retention_important_vehicles = data[2]
#     local_retention_scores = {}
#     for gt_vehicle in local_vehicle_ids:
#         for vehicles in retention_important_vehicles:
#             if gt_vehicle == vehicles[0]:
#                 local_retention_scores[gt_vehicle] = vehicles[1]
    
#     retention_scores.append(local_retention_scores)


# df_trials['retention_scores'] = retention_scores
# df_trials['removal_scores'] = removal_scores
df_trials['vehicle_ids'] = vehicle_ids
# print(df_trials[:50])

df_trials.to_csv("gt_annotations_6_9_1.csv")